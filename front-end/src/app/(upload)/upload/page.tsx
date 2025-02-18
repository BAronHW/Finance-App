'use client'

import React, { useState } from 'react'
import { auth } from '@/lib/firebase/firebase'
import { UPLOAD_PDF } from '@/lib/graphql/Documents'
import { useMutation } from '@apollo/client'

export default function PDFUploader() {
    const firebaseCurrentUser = auth.currentUser
    const [pdfFile, setPdfFile] = useState<File | null>(null)
    const [uploadPdfFunction, { data, loading, error }] =
        useMutation(UPLOAD_PDF)

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.files && event.target.files[0]) {
            setPdfFile(event.target.files[0])
            console.log(event.target.files[0])
        }
    }

    const onFileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!pdfFile) return

        const reader = new FileReader()
        reader.readAsDataURL(pdfFile)
        reader.onload = async () => {
            const base64String = (reader.result as string).split(',')[1]

            try {
                const result = await uploadPdfFunction({
                    variables: {
                        name: pdfFile.name,
                        size: pdfFile.size,
                        file: base64String,
                    },
                })
                console.log('Upload successful:', result)
            } catch (err) {
                console.error('Upload failed:', err)
            }
        }
    }

    return (
        <div className="p-4">
            {firebaseCurrentUser && (
                <div>
                    <p>Firebase User Email: {firebaseCurrentUser.email}</p>
                    <p>Firebase User ID: {firebaseCurrentUser.uid}</p>
                </div>
            )}

            <form onSubmit={onFileSubmit}>
                <input
                    placeholder="fileupload"
                    type="file"
                    className=""
                    accept="application/pdf"
                    onChange={onFileChange}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}
