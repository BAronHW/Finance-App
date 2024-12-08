"use client"

import { SignUpForm } from '@/src/components/SignUpForm'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@/src/components/ui/button';
import '@/src/app/globals.css'
import { useAuth } from "@/src/lib/Contexts/AuthContext"

const SignUpPage = () => {
  const authData = useAuth()

  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-6">
        {authData.currentUser ? "Complete the sign up for your account" : "Signing in with Google..."}
      </h2>

      {authData.currentUser &&
        <SignUpForm 
          withGoogle={true}
        />
      }
    </>
  )
}

export default SignUpPage;