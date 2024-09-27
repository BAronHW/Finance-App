"use client"
import React from 'react';
import { MeteorDemo } from '@/components/MeteorsDemo';
import { ProfileForm } from '@/components/SigninForm';
import { Card, CardContent } from '@/components/ui/card';
import WordPullUp from "@/components/magicui/word-pull-up";
import { signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { auth, provider } from '@/lib/Firebase';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const SigninPage = () => {
  const router = useRouter();
  const firebaseGmailSignin = async (): Promise<void> => {
    if (typeof window === 'undefined' || !auth) {
      console.error('Auth is not available');
      return;
    }

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error("Firebase credential does not exist or can't be fetched");
      }
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        const errorCode = (error as any).code;
        const errorMessage = error.message;
        const email = (error as any).customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error as any);
        console.error("Sign-in error:", { errorCode, errorMessage, email, credential });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <MeteorDemo />
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 flex-col gap-6">
        <WordPullUp
          className="text-4xl font-bold tracking-[-0.02em] text-black md:text-7xl md:leading-[5rem]"
          words="FinApp"
        />
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-6">Sign In</h2>
            <ProfileForm />
            <div className="mt-4 text-center">
              <p className="text-sm text-black mb-2">Or sign in with</p>
              <Button 
                onClick={firebaseGmailSignin}
                variant="outline"
                className="w-full bg-white text-gray-800 hover:bg-gray-100"
              >
                Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SigninPage;