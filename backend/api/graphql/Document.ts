/**
 * allow for the upload of documents from the front-end
 * allow for the analysis fo rdocuments on the backend 
 * allow for download of documents to the front-end
 * allow for storage of files on s3 buckets
 * 
 */

import { extendType, intArg, objectType, stringArg, nonNull } from 'nexus';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/S3Bucket"
import * as crypto from 'crypto'
import dotenv from 'dotenv'
import { GetObjectCommand } from "@aws-sdk/client-s3";
dotenv.config()

const bucketName = process.env.BUCKET_NAME

export const Document = objectType({
    name: "Document",
    definition(t) {
        t.nonNull.string("key");
        t.nonNull.int("name");
        t.nonNull.string("size");
        t.nonNull.string('uid')
    },
})

export const Muation = extendType({
    type: 'Mutation',
    definition(t) {
        t.field('uploadPdf', {
            type: 'Any',
            args: {
                name: nonNull(stringArg()),
                size: nonNull(intArg()),
                file: nonNull(stringArg()),
                uid: nonNull(stringArg()),
            },
            async resolve(_root, args, ctx){
                const buffer = Buffer.from(args.file, 'base64');

                const randomName = (bytes = 32) => {
                    return crypto.randomBytes(bytes).toString('hex')
                }

                const uniqueName = randomName()

                const params = {
                    Bucket: bucketName,
                    Key: uniqueName,
                    Body: buffer,
                    ContentType: "PDF",
                }
                const command = new PutObjectCommand(params)

                await s3.send(command);

                const uploadDocument = await ctx.db.document.create({
                    data:{
                        key: uniqueName,
                        name:  args.name,
                        size: args.size,
                        uid: args.uid,
                    }
                })

                return uploadDocument;

            }
        })
    },
})

export const Queries = extendType({
    type: 'Query',
    definition(t) {
        t.field('getPdfUrlByKey', {
            type: 'Any',
            args: {
                key: nonNull(stringArg())
            },
            async resolve(_root, args, ctx) {
                const document = await ctx.db.document.findUnique({
                    where: {
                        key: args.key
                    },
                });
        
                if (!document) {
                    throw new Error('Document not found');
                }
        
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: document.key,
                };
        
                const command = new GetObjectCommand(getObjectParams);
                const response = await s3.send(command);

                console.log(response.Body)

                if (!response.Body){
                    throw new Error("Unable to retrieve s3 object")
                }
                
                const arrayBuffer = await response.Body.transformToByteArray();
                const buffer = Buffer.from(arrayBuffer);

            return {
                file: buffer.toString('base64'),
                name: document.name,
                size: document.size,
                contentType: response.ContentType,
                lastModified: response.LastModified
            };
            }
        });
    },
})

