"use client"

import { SignUpForm } from '@/src/components/SignUpForm'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button';
import '@/src/app/globals.css'
import { signInWithGoogle } from '@/src/lib/Firebase/GoogleSignIn'

const SignUpPage = () => {
  const router = useRouter();

  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-6">Complete the sign up for your account</h2>
      <SignUpForm 
        withGoogle={true}
      />
    </>
  )
}

export default SignUpPage;