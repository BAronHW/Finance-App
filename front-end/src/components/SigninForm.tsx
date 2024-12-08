"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/lib/Contexts/AuthContext";
import { emailAndPasswordSignIn } from "../lib/Firebase/EmailPasswordSignIn";
import { googleSignIn } from '@/src/lib/Firebase/GoogleSignIn';
import { FormEvent, useState } from "react";

export function SignInForm() {
  const router = useRouter();

  const authData = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

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
      user,
      errorCode,
      errorMessage,
    } = await emailAndPasswordSignIn(values.email, values.password);

    console.log("emailAndPasswordSignIn response object:");
    console.log(user, errorCode, errorMessage)
    
    if (errorCode && errorMessage) {
      setErrorCode(errorCode)
      setErrorMessage(errorMessage)
    } else if (user) {
      router.push(`/home/${user.id}`)
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
      <div className="mt-4 text-center">
        <p className="text-sm text-black mb-2">Or sign in with</p>
        <Button
          onClick={
            async () => {
              const {
                user,
                errorCode,
                errorMessage,
              } = await googleSignIn();

              if (errorCode && errorMessage) {
                setErrorCode(errorCode)
                setErrorMessage(errorMessage)
              } else if (user) {
                router.push(`/home/${user.id}`)
              } else {
                router.push(`/google-sign-up`)
              }
            }
          }
          variant="outline"
          className="w-full bg-white text-gray-800 hover:bg-gray-100"
        >
          Google
        </Button>
        {
          errorCode && errorMessage &&
          <div className="items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            <p>{"Error whilst signing in: " + errorCode + "\n"}</p>
            <p>{errorMessage}</p>
          </div>
        }
      </div>
    </>
  );
}
