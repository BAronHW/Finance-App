import React from 'react';
import { MeteorDemo } from '@/components/MeteorsDemo';
import { ProfileForm } from '@/components/SigninForm';
import { Card, CardContent } from '@/components/ui/card';
import WordPullUp from "@/components/magicui/word-pull-up";

export default function SigninPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <MeteorDemo />
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8 flex-col gap-3">
      <WordPullUp
        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
        words="FinApp"
        />
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg shadow-xl">
          <CardContent className="p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-center text-black mb-6">Sign In</h2>
            <ProfileForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}