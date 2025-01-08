"use client"

import { SignUpForm } from '@/components/customComponents/SignUpForm'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import '@/app/globals.css'
import { useAuth } from "@/lib/contexts/authContext"

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