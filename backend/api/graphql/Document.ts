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
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as fs from 'node:fs';
import path from 'node:path';
import os from 'os';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
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

export const s3Object = objectType({
    name: "s3Object",
    definition(t) {
        t.nonNull.string("key");
        t.nonNull.string("name");
        t.nonNull.int("size");
        t.nonNull.string('uid');
        t.nonNull.string('file');
        t.string('contentType');
        t.string('lastModified');
    },
});

interface DocumentInterface{
    key: string,
    size: number,
    name: string | null,
    uid: string
}

interface Document{
    file: string,
    name: string,
    size: number,
    contentType: string,
    lastModified: Date
}

export const DocumentMutation = extendType({
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
                    Key: args.documentKey,
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

                // TODO:
                // this works but for some reason keeps timing out

                try{

                    console.log('here')

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

                    console.log(Deleted)


                    if(!Deleted || Deleted.length == 0){
                        return false
                    }
    
                    for (const document in documentArray) {
                        console.log(document)
                        await waitUntilObjectNotExists(
                            {
                                client: s3,
                                maxWaitTime: 30
                            },
                            {
                                Bucket: bucketName,
                                Key: documentArray[document].key
                            }
                        );
                    }

                    await ctx.db.document.deleteMany({
                        where:{
                            uid: args.uid
                        }
                    })
    
                    return true;

                }catch(err){
                    console.log(err)
                    throw new Error('unable to delete objects')
                }
            }
        })
        t.field('analyseSinglePdfWithAI',{
            type: 'Any',
            args:{
                pdfKey: nonNull(stringArg())
            },
            async resolve(_root, args, ctx){

                const uniquePdf = await ctx.db.document.findUnique({
                    where:{
                        key: args.pdfKey
                    }
                })

                if(!uniquePdf){
                    return false
                }

                interface s3ObjInterface {
                    file: string,
                    name: string | null,
                    size: number,
                    contentType: string | undefined,
                    lastModified: Date | undefined,
                }


                const getObjectParams = {
                    Bucket: bucketName,
                    Key: uniquePdf.key
                }

                const command = new GetObjectCommand(getObjectParams);
                const response = await s3.send(command);

                if (!response.Body){
                    throw new Error("Unable to retrieve s3 object")
                }

                const arrayBuffer = await response.Body.transformToByteArray();
                const buffer = Buffer.from(arrayBuffer);


                const tempDir = os.tmpdir();
                const tempFilePath = path.join(tempDir, `${uniquePdf.key}.pdf`);
                fs.writeFileSync(tempFilePath,buffer);

                const loader = new PDFLoader(tempFilePath, {
                    splitPages: true,
                });
                const docs = await loader.load();

                const textSplitter = new RecursiveCharacterTextSplitter({
                    chunkSize: 1000,
                    chunkOverlap: 200,
                });

                const splitDocs = await textSplitter.splitDocuments(docs);
                console.log(`Split into ${splitDocs.length} chunks`);


                const model = new ChatGoogleGenerativeAI({
                    modelName: "gemini-1.5-pro",
                    maxOutputTokens: 2048,
                    apiKey: process.env.GEMINI_KEY
                });
                
                const tableExtractionPrompt = PromptTemplate.fromTemplate(`
                    You are a data extraction specialist. Analyze the following PDF content carefully to identify and extract ALL tables.
                    
                    For each table:
                    1. Identify the table boundaries
                    2. Preserve the exact structure (rows and columns)
                    3. Extract the column headers
                    4. Extract all data cells
                    5. Convert to a clean JSON format
                    
                    If you encounter any data that looks tabular (even if it's not in a formal table), extract it as well.
                    
                    Here's the PDF content to analyze:
                    
                    {context}
                    
                    Return ONLY the extracted tables in the following structured JSON format:
                    {{
                      "tables": [
                        {{
                          "tableTitle": "title or description of the table",
                          "headers": ["column1", "column2", "column3", ...],
                          "rows": [
                            ["row1cell1", "row1cell2", "row1cell3", ...],
                            ["row2cell1", "row2cell2", "row2cell3", ...],
                            ...
                          ]
                        }},
                        ... additional tables ...
                      ]
                    }}
                    
                    Don't include any explanations, just the JSON data.
                `);

                const chain = tableExtractionPrompt.pipe(model);

                /**
                 * TODO:
                 * 1. using the current prompt extract all the table data from each chunk 
                 * 2. then write a function to return all of the data from each chunk and merge it back into one json format.
                 * 
                 */
                return null
            }
        })
    },
})

export const DocumentQueries = extendType({
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
        t.field('getALLPDFURLBelongingToUserByUid', {
            type: nonNull(list(nonNull('String'))),
            args:{
                uid: nonNull(stringArg())
            },
            async resolve(_root, args, ctx){
                const keysArr = await ctx.db.document.findMany({
                    where:{
                        uid: args.uid
                    }
                })
                const commandArray = await Promise.all(keysArr.map((key) =>{
                    const command = new GetObjectCommand({
                        Bucket: bucketName,
                        Key: key.key,
                        ResponseContentDisposition: 'inline',
                        ResponseContentType: 'application/pdf',
                    })
                    return command
                }))
                

                const urlArray = Promise.all(commandArray.map(async(command)=>{
                    const url = await getSignedUrl(s3, command, { expiresIn: 3000 });
                    return url
                }))

                return urlArray;
            }
        })
        t.field('getAllPdfBelongingToUserByUid', {
            type: nonNull(list(nonNull('Document'))),
            args: {
                uid: nonNull(stringArg())
            },
            async resolve(_root, args, ctx): Promise<DocumentInterface[]>{
                const pdf: DocumentInterface[] = await ctx.db.document.findMany({
                    where: {
                        uid: args.uid
                    }
                })
                return pdf
            }
        })
        t.field('getAllPdfBuffersByUid', {
            type: list(nonNull('Any')),
            args:{
                uid: nonNull(stringArg())
            },
            async resolve(_root, args, ctx){
                const pdfBufferArray = await ctx.db.document.findMany({
                    where:{
                        uid: args.uid
                    }
                })
                interface s3ObjInterface {
                    file: string,
                    name: string | null,
                    size: number,
                    contentType: string | undefined,
                    lastModified: Date | undefined,
                }

                const returnBufferArray: s3ObjInterface[] = await Promise.all(pdfBufferArray.map( async (document) => {

                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: document.key
                    }

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

                }))
                return returnBufferArray;
            }
        })
    },
})

// TODO:
// 1. create a pipeline to turn pdf into markdown file
// 2. given the key of a pdf document get its buffer then convert it to 
// 2. extract text from markdown files then 
// 3. chunk and rag the documents into vector db for RAG applications