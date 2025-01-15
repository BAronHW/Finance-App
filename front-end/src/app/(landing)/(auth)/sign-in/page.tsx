"use client";
import React from "react";
import { SignInForm } from "@/components/customComponents/authComponents/SigninForm";

const SigninPage = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
      <SignInForm />
    </>
  );
};

export default SigninPage;
