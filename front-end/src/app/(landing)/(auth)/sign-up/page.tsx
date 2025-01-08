"use client";

import { SignUpForm } from "@/components/customComponents/SignUpForm";
import React from "react";
import "@/app/globals.css";

const SignUpPage = () => {
  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
      <SignUpForm withGoogle={false} />
    </>
  );
};

export default SignUpPage;
