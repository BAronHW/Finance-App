"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/authContext";
import { useEmailPasswordSignIn } from '@/lib/hooks/useEmailPasswordSignIn';
import { useGoogleSignIn } from '@/lib/hooks/useGoogleSignIn';
import { FormEvent, useState } from "react";
import GoogleSignIn from "./GoogleSignIn";

export function SignInForm() {
  const router = useRouter();

  const authData = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const { googleSignIn, queryError: googleQueryError} = useGoogleSignIn();
  const { emailPasswordSignIn, queryError: emailPasswordQueryError } = useEmailPasswordSignIn();

  const formSchema = z.object({
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(9, {
      message: "Password must be at least 9 characters long.",
    }),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (values: z.infer<typeof formSchema>) => {
    const {
      user: emailPasswordUser,
      errorCode,
      errorMessage,
    } = await emailPasswordSignIn(values.email, values.password);
    
    if (errorCode && errorMessage) {
      setErrorCode(errorCode)
      setErrorMessage(errorMessage)
    } else if (emailPasswordUser) {
      router.push(`/home/${emailPasswordUser.id}`)
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSignIn)}
          className="space-y-8 flex flex-col justify-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign in</Button>
        </form>
      </Form>
      <div className="mt-6 space-y-4 text-center">
        <p className="text-lg mb-2">New user? Create an account below:</p>
        <Link href="/sign-up" passHref>
          <Button variant="secondary" className="m-15 w-full">Sign Up</Button>
        </Link>
      </div>
      <GoogleSignIn 
        signUp={false}
      />
      {errorCode && errorMessage && (
        <div className="flex-column text-center p-4 mt-6 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
          <p className="flex-1 my-2">Error while registering new user:</p>
          <p className="flex-1 my-2">{errorCode}</p>
          <p className="flex-1 my-2">{errorMessage}</p>
        </div>
      )}
    </>
  );
}
