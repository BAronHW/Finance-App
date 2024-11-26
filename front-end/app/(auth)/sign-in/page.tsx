"use client"
import React, { useState } from 'react';
import { MeteorDemo } from '@/components/MeteorsDemo';
import { ProfileForm } from '@/components/SigninForm';
import { Card, CardContent } from '@/components/ui/card';
import WordPullUp from "@/components/magicui/word-pull-up";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { firebaseGmailSignin } from '@/lib/firebase-auth';
import { useAuth } from '@/app/context/authContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/Firebase';

const SigninPage = () => {
  const router = useRouter();
  const { login, isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUser] = useAuthState(auth);

  if(registeredUser){
    router.push('/')
  }

  const gmailSignIn = () => {
    setIsLoading(true);
    firebaseGmailSignin(router)
      .then(() => router.push('/'))
      .catch(console.error)
      .finally(() => setIsLoading(false));
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
                onClick={gmailSignIn}
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