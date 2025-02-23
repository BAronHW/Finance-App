/**
 * allow for the upload of documents from the front-end
 * allow for the analysis fo rdocuments on the backend 
 * allow for download of documents to the front-end
 * allow for storage of files on s3 buckets
 * 
 */

import { extendType, intArg, objectType, stringArg, nonNull, list } from 'nexus';
import { DeleteObjectCommand, DeleteObjectsCommand, PutObjectCommand, waitUntilBucketNotExists, waitUntilObjectNotExists } from "@aws-sdk/client-s3";
import { s3 } from '../config/S3Bucket';
import * as crypto from 'crypto'
import dotenv from 'dotenv'
import { GetObjectCommand } from "@aws-sdk/client-s3";
dotenv.config()

const bucketName = process.env.BUCKET_NAME

export const Document = objectType({
    name: "Document",
    definition(t) {
        t.nonNull.string("key");
        t.nonNull.int("size");
        t.string("name");
        t.nonNull.string('uid')
    },
})

interface DocumentInterface{
    key: string,
    size: number,
    name: string | null,
    uid: string
}

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
                console.log(args.uid)
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
        });
        t.field('deleteDocumentByKey', {
            type: 'Boolean',
            args: {
                documentKey: nonNull(stringArg())
            },
            async resolve(_root, args, ctx) {

                const getObjectParams = {
                    Bucket: bucketName,
                    Key: args.key,
                };

                try{
                    const deleteDataFromS3 = await s3.send(new DeleteObjectCommand(getObjectParams))
                }catch (error){
                    throw new Error('unable to delete document from s3 bucket')
                }

                try{
                    const pdfToDelete = await ctx.db.document.delete({
                        where:{
                            key: args.documentKey
                        }
                    })
                    
                    if(!pdfToDelete){
                        return false;
                    }
                    
                    return true;

                }catch(err){
                    throw new Error('unable to delete the associated pdf record from postgres')
                }
            }
        });
        t.field('deleteAllDocumentsAssociatedWithUserInBucketByUid', {
            type: 'Boolean',
            args:{
                uid: nonNull(stringArg())
            },
            async resolve(_root, args, ctx) {

                try{

                    const documentArray = await ctx.db.document.findMany({
                        where:{
                            uid: args.uid
                        },
                    })

                    if(!documentArray || documentArray.length == 0){
                        return false
                    }
    
                    const { Deleted } = await s3.send(
                        new DeleteObjectsCommand({
                            Bucket: bucketName,
                            Delete: {
                                Objects: documentArray.map((document) => ({ Key: document.key })),
                            },
                        }),
                    );

                    if(!Deleted || Deleted.length == 0){
                        return false
                    }
    
                    for (const document of documentArray) {
                        await waitUntilObjectNotExists(
                            {
                                client: s3,
                                maxWaitTime: 60
                            },
                            {
                                Bucket: bucketName,
                                Key: document.key
                            }
                        );
                    }
    
                    return true;

                }catch(err){
                    throw new Error('unable to delete objects')
                }
                

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
        t.field('getAllPdfBelongingToUserByUid', {
            type: nonNull(list(nonNull('Document'))),
            args: {
                uid: nonNull(stringArg())
            },
            async resolve(_root, args, ctx): Promise<DocumentInterface[]>{
                const pdf = await ctx.db.document.findMany({
                    where: {
                        uid: args.uid
                    }
                })
                return pdf
            }
        })
    },
})

