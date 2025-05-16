"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleSignIn from "@/components/custom/auth/GoogleSignIn";
import { LoaderCircle } from "lucide-react";
import { useEmailPasswordSignIn } from "@/lib/hooks/useEmailPasswordSignIn";

const SigninPage = () => {
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const { emailPasswordSignIn, queryError: emailPasswordQueryError } =
    useEmailPasswordSignIn();

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
    setSigningIn(true);
    const {
      user: emailPasswordUser,
      errorCode,
      errorMessage,
    } = await emailPasswordSignIn(values.email, values.password);
    if (errorCode && errorMessage) {
      setErrorCode(errorCode);
      if (errorCode === "auth/invalid-credential") {
        setErrorCode("Please check your username and password!");
      } else {
        setErrorMessage(errorMessage);
      }
    } else if (emailPasswordUser) {
      router.push(`/home/${emailPasswordUser.id}`);
    }
    setSigningIn(false);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
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
            <Button type="submit" disabled={signingIn}>
              {signingIn ? (
                <>
                  <LoaderCircle className="animate-spin mr-2" />
                  Signing In
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 space-y-4 text-center">
          <p className="text-md font-light mt-4 mb-2">New user? Create an account below:</p>
          <Link href="/sign-up" passHref>
            <Button variant="secondary" className="m-15 w-full" type="submit">
              Sign Up
            </Button>
          </Link>
        </div>
        <GoogleSignIn signUp={false} />
        {errorCode && errorMessage && (
          <div className="flex-column text-center p-4 mt-6 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            <p className="flex-1 my-2">Error while logging in:</p>
            <p className="flex-1 my-2">{errorCode}</p>
            <p className="flex-1 my-2">{errorMessage}</p>
          </div>
        )}
      </>
    </>
  );
};

export default SigninPage;
