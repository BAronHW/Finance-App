'use client'
import { useAuth } from '@/lib/contexts/authContext'
import { GET_ALL_PDF_URL_FROM_USER } from '@/lib/graphql/Documents'
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'

export default function PDFViewer() {
    const [pdfDocuments, setPdfDocuments] = useState(null)
    const { currentUser } = useAuth()
    const { loading, error, data } = useQuery(GET_ALL_PDF_URL_FROM_USER, {
        variables: {
            uid: currentUser?.uid,
        },
        fetchPolicy: 'network-only',
    })

    console.log('PDF data:', data?.getALLPDFURLBelongingToUserByUid)

    return (
        <div>
            <h1>Your Files</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <div>
                {data &&
                    data.getALLPDFURLBelongingToUserByUid &&
                    data.getALLPDFURLBelongingToUserByUid.map(
                        (document, index) => (
                            <iframe
                                key={index}
                                src={document}
                                width="25%"
                                height="500px"
                                title={`PDF Document ${index + 1}`}
                            ></iframe>
                        )
                    )}
            </div>
        </div>
    )
}
