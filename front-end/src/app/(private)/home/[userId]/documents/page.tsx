'use client'
import { MagicCard } from '@/components/magicui/magic-card'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/contexts/authContext'
import { GET_ALL_PDF_URL_FROM_USER } from '@/lib/graphql/Documents'
import { useQuery } from '@apollo/client'
import React from 'react'

export default function PDFViewer() {
    const { currentUser } = useAuth()
    const { loading, error, data } = useQuery(GET_ALL_PDF_URL_FROM_USER, {
        variables: {
            uid: currentUser?.uid,
        },
        fetchPolicy: 'network-only',
    })

    // Make sure to use the correct property name based on your API response
    // Using optional chaining to safely access the data
    const pdfUrls = data?.getALLPDFURLBelongingToUserByUid || []

    console.log('PDF data:', pdfUrls)

    return (
        <div className="container mx-auto px-4 pb-8">
            {loading && <div className="text-center py-4">Loading...</div>}
            {error && (
                <div className="text-center py-4 text-red-500">
                    Error: {error.message}
                </div>
            )}

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6 text-center">
                View All Your Uploaded Documents Here!
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pdfUrls.map((document: string, index: number) => (
                    <Card>
                        <MagicCard
                            key={index}
                            className="border rounded-lg shadow-md overflow-hidden"
                            gradientColor="#D9D9D955"
                        >
                            <CardHeader>
                                <CardTitle>Document {index + 1}</CardTitle>
                            </CardHeader>

                            <div className="h-[500px] overflow-hidden">
                                <iframe
                                    src={document}
                                    width="100%"
                                    height="100%"
                                    title={`PDF Document ${index + 1}`}
                                    className="border-none"
                                ></iframe>
                            </div>
                        </MagicCard>
                    </Card>
                ))}
            </div>

            {pdfUrls.length === 0 && !loading && (
                <div className="text-center py-10 text-gray-500">
                    No documents found. Upload some PDFs to get started.
                </div>
            )}
        </div>
    )
}
