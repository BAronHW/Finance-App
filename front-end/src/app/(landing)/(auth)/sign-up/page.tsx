"use client"

import { SignUpForm } from '@/src/components/SignUpForm'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button';
import '@/src/app/globals.css'
import { googleSignIn } from '@/src/lib/Firebase/GoogleSignIn'

const SignUpPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const router = useRouter();

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
      <SignUpForm 
        withGoogle={false}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-black mb-2">Or sign in with</p>
        <Button
          onClick={
            async () => {
              const {
                user,
                errorCode,
                errorMessage,
              } = await googleSignIn();

              console.log("googleSignIn response object:");
              console.log(user, errorCode, errorMessage)

              if (errorCode && errorMessage) {
                setErrorCode(errorCode)
                setErrorMessage(errorMessage)
              } else if (user) {
                router.push(`/home/${user.id}`)
              }
            }
          }
          variant="outline"
          className="m-15 w-full bg-white text-gray-800 hover:bg-gray-100"
        >
          Google
        </Button>
        {
          errorCode && errorMessage &&
          <div className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            <p>{"Error with Google sign-in: " + errorCode + ""}</p>
            <p>{errorMessage}</p>
          </div>
        }
      </div>
    </>
  )
}

export default SignUpPage;