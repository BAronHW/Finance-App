"use client"
import React, { useState } from 'react';
import { SignInForm } from '@/src/components/SigninForm';
import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { signInWithGoogle } from '@/src/lib/Firebase/GoogleSignIn';
import { useAuth } from '@/src/lib/Contexts/AuthContext';

const SigninPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const router = useRouter();

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
      <SignInForm />
      <div className="mt-4 text-center">
        <p className="text-sm text-black mb-2">Or sign in with</p>
        <Button
          onClick={
            async () => {
              const {
                user,
                errorCode,
                errorMessage,
              } = await signInWithGoogle();

              if (errorCode && errorMessage) {
                setErrorCode(errorCode)
                setErrorMessage(errorMessage)
              } else if (user) {
                router.push(`/home/${user.id}`)
              } else {
                router.push(`/google-sign-up`)
              }
            }
          }
          variant="outline"
          className="w-full bg-white text-gray-800 hover:bg-gray-100"
        >
          Google
        </Button>
        {
          errorCode && errorMessage &&
          <div className="items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            <p>{"Error with Google sign-in: " + errorCode + ""}</p>
            <p>{errorMessage}</p>
          </div>
        }
      </div>
    </>
  );
};

export default SigninPage;