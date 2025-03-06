'use client'

import React from 'react'
import '@/app/globals.css'
import { useAuth } from '@/lib/contexts/authContext'
import { GoogleSignUpForm } from '@/components/custom/auth/GoogleSignUpForm'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '@/lib/graphql/Users'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomError } from '@/lib/utils'

const googleSignUpFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    username: z
        .string()
        .min(2, {
            message: 'Username must be at least 2 characters.',
        })
        .optional(),
    phone: z
        .string()
        .min(10, {
            message: 'Phone number must be at least 10 characters.',
        })
        .optional(),
})

export type GoogleSignUpSchemaType = typeof googleSignUpFormSchema

const SignUpPage = () => {
    const router = useRouter()
    const authData = useAuth()
    const [createUser] = useMutation(CREATE_USER)

    if (!authData.currentUser || !authData.currentUser?.email) {
        throw new Error('No user email detected through Auth context.')
    }

    const form = useForm<z.infer<typeof googleSignUpFormSchema>>({
        resolver: zodResolver(googleSignUpFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            phone: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof googleSignUpFormSchema>) => {
        if (authData.currentUser?.email) {
            const newUser = await createUser({
                variables: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    username: values.username ?? authData.currentUser.email,
                    password: null,
                    email: authData.currentUser.email,
                    phone: values.phone,
                    uid: authData.currentUser.uid,
                },
            })

            if (!newUser.data) {
                throw new CustomError(
                    'Error creating new user',
                    'newUser.data is nullish'
                )
            }

            router.push(`/home/${newUser.data.createUser.id}`)
        }
    }

    return (
        <>
            <h2 className="text-3xl text-center font-bold mb-6">
                {authData.currentUser
                    ? 'Complete the sign up for your account'
                    : 'Signing in with Google...'}
            </h2>

            {authData.currentUser && (
                <GoogleSignUpForm form={form} onSubmit={onSubmit} />
            )}
        </>
    )
}

export default SignUpPage
