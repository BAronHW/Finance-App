'use client'

import React, { useState } from 'react'
import '@/app/globals.css'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useAuth } from '@/lib/contexts/authContext'
import { auth } from '@/lib/firebase/firebase'
import { CREATE_USER } from '@/lib/graphql/Users'
import { useMutation } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CustomError } from '@/lib/utils'
import { EmailSignUpForm } from '@/components/customComponents/authComponents/EmailSignUpForm'
import GoogleSignIn from '@/components/customComponents/authComponents/GoogleSignIn'

export const emailSignUpFormSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email({
            message: 'Invalid email address.',
        }),
        password: z.string().min(9, {
            message: 'Password must be at least 9 characters long.',
        }),
        confirmPassword: z.string().min(9, {
            message: 'Password must be at least 9 characters long.',
        }),
        username: z.string().optional(),
        phone: z
            .string()
            .min(10, {
                message: 'Phone number must be at least 10 characters.',
            })
            .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match.',
        path: ['confirmPassword'],
    })
    .transform((data) => ({
        ...data,
        username: data.username ?? data.email,
    }))

export type EmailSignUpSchemaType = typeof emailSignUpFormSchema

const SignUpPage = () => {
    const router = useRouter()
    const authData = useAuth()
    const [createUser] = useMutation(CREATE_USER)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorCode, setErrorCode] = useState('')
    const [emailInUse, setEmailInUse] = useState(false)

    const form = useForm<z.infer<EmailSignUpSchemaType>>({
        resolver: zodResolver(emailSignUpFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            username: '',
            phone: '',
        },
    })

    const onSubmit = async (values: z.infer<EmailSignUpSchemaType>) => {
        setEmailInUse(false)
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then(async (userCredential) => {
                const firebaseUser = userCredential.user

                const newUser = await createUser({
                    variables: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        username: values.username,
                        password: values.password,
                        email: values.email,
                        phone: values.phone,
                        uid: firebaseUser.uid,
                    },
                })

                if (!newUser.data) {
                    throw new CustomError(
                        'Error creating new user',
                        'newUser.data is nullish'
                    )
                }

                router.push(`/home/${newUser.data.createUser.id}`)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                if (errorCode === 'auth/email-already-in-use') {
                    setEmailInUse(true)
                }
                setErrorCode(errorCode)
                setErrorMessage(errorMessage)
            })
    }

    return (
        <>
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <EmailSignUpForm form={form} onSubmit={onSubmit} />
            <GoogleSignIn signUp={true} />
            {errorCode &&
                errorMessage &&
                (emailInUse ? (
                    <div className="text-center p-4 mt-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
                        <p className="flex-1 my-2">
                            Email already in use. Go to sign in instead or use a
                            new email to create a new account.
                        </p>
                    </div>
                ) : (
                    <div className="flex-column text-center p-4 mt-6 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
                        <p className="flex-1 my-2">
                            Error while registering new user:
                        </p>
                        <p className="flex-1 my-2">{errorCode}</p>
                        <p className="flex-1 my-2">{errorMessage}</p>
                    </div>
                ))}
        </>
    )
}

export default SignUpPage

// auth/email-already-in-use
