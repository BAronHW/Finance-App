'use client'
// TODO:
// Rewrite this to make it into different components

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { auth } from '@/lib/firebase/firebase'
import { UPLOAD_PDF } from '@/lib/graphql/Documents'
import { useMutation } from '@apollo/client'
import { useAuth } from '../../../lib/contexts/authContext'
import { Upload, UploadCloudIcon, UploadIcon } from 'lucide-react'

export default function PDFDropzone() {
    const firebaseCurrentUser = auth.currentUser
    const authContext = useAuth()
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [uploadPdfFunction, { data, loading, error }] =
        useMutation(UPLOAD_PDF)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0]

        if (selectedFile && selectedFile.type === 'application/pdf') {
            setPdfFile(selectedFile)
            setUploadError(null)
            setUploadSuccess(false)
            console.log('File selected:', selectedFile)
        } else {
            setUploadError('Please upload a valid PDF file')
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
        },
        maxFiles: 1,
    })

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!pdfFile) return

        setUploadError(null)
        setUploadSuccess(false)

        const reader = new FileReader()
        reader.readAsDataURL(pdfFile)
        reader.onload = async () => {
            const base64String = (reader.result as string).split(',')[1]
            const uid = authContext.currentUser?.uid

            try {
                const result = await uploadPdfFunction({
                    variables: {
                        name: pdfFile.name,
                        size: pdfFile.size,
                        file: base64String,
                        uid: uid?.toString(),
                    },
                })
                console.log('Upload successful:', result)
                setUploadSuccess(true)
                setPdfFile(null)
            } catch (err) {
                console.error('Upload failed:', err)
                setUploadError('Upload failed. Please try again.')
            }
        }
    }

    return (
        <div className="max-w-xl mx-auto p-4">
            {firebaseCurrentUser && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Welcome {firebaseCurrentUser.displayName} upload any
                        documents you would like to store
                    </h2>
                    <p className="text-sm">
                        <span className="font-medium">User:</span>{' '}
                        {firebaseCurrentUser.email}
                    </p>
                </div>
            )}

            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-4
                    ${
                        isDragActive
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }`}
            >
                <div className="flex flex-col items-center ">
                    <UploadCloudIcon size={50}></UploadCloudIcon>
                    <input {...getInputProps()} />
                </div>

                {isDragActive ? (
                    <p className="text-blue-500">Drop your PDF here...</p>
                ) : (
                    <div>
                        <p className="mb-2">
                            Drag and drop your PDF here, or click to select a
                            file
                        </p>
                        <p className="text-sm text-gray-500">
                            Only PDF files are accepted
                        </p>
                    </div>
                )}
            </div>

            {pdfFile && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">Selected file:</p>
                    <p className="text-sm truncate">
                        {pdfFile.name} ({(pdfFile.size / 1024).toFixed(2)} KB)
                    </p>

                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className={`mt-4 px-4 py-2 rounded-md text-white w-full
                            ${
                                loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {loading ? 'Uploading...' : 'Upload PDF'}
                    </button>
                </div>
            )}

            {uploadSuccess && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    File uploaded successfully!
                </div>
            )}

            {(uploadError || error) && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {uploadError || error?.message || 'An error occurred'}
                </div>
            )}
        </div>
    )
}
