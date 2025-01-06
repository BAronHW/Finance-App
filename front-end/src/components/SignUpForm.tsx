"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@//components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@//components/ui/form";
import { Input } from "@//components/ui/input";
import { useRouter } from "next/navigation";
import { FunctionComponent, useState } from "react";
import { auth } from "../lib/Firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../lib/GraphQL/Users";
import { useAuth } from "../lib/Contexts/AuthContext";
import { useGoogleSignIn } from "../lib/Hooks/useGoogleSignIn";

export const SignUpForm: FunctionComponent<{ withGoogle: boolean }> = ({
  withGoogle,
}: {
  withGoogle: boolean;
}) => {
  const router = useRouter();

  const authData = useAuth();

  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const { googleSignIn, queryError: googleQueryError } = useGoogleSignIn();

  const formSchema = z
    .object({
      firstName: z.string(),
      lastName: z.string(),
      email: withGoogle
        ? z.string().optional()
        : z.string().email({
            message: "Invalid email address.",
          }),
      password: withGoogle
        ? z.string().optional()
        : z.string().min(9, {
            message: "Password must be at least 9 characters long.",
          }),
      confirmPassword: withGoogle
        ? z.string().optional()
        : z.string().min(9, {
            message: "Password must be at least 9 characters long.",
          }),
      username: z
        .string()
        .min(2, {
          message: "Username must be at least 2 characters.",
        })
        .optional(),
      phone: z
        .string()
        .min(10, {
          message: "Phone number must be at least 10 characters.",
        })
        .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match.",
      path: ["confirmPassword"],
    })
    .transform((data) => ({
      ...data,
      username: data.username ? data.username : data.email,
    }));

  if (!authData.currentUser?.email) {
    throw new Error("No user email detected throm Auth context.");
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: withGoogle ? `${authData.currentUser?.email}` : "",
      password: withGoogle ? "Google account password" : "",
      confirmPassword: withGoogle ? "Google account password" : "",
      username: "",
      phone: "",
    },
  });

  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (withGoogle && authData.currentUser) {
      const newUser = await createUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          password: null,
          email: authData.currentUser.email,
          phone: values.phone,
          uid: authData.currentUser.uid,
        },
      });

      console.log(newUser);

      router.push(`/home/${newUser.data.createUser.id}`);
    } else if (!withGoogle && values.password && values.email) {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(async (userCredential) => {
          const firebaseUser = userCredential.user;

          const newUser = await createUser({
            variables: {
              firstName: values.firstName,
              lastName: values.lastName,
              username: values.username,
              password: values.password,
              email: values.email,
              phone: values.phone,
              uid: firebaseUser.uid,
            },
          });

          router.push(`/home/${newUser.data.createUser.id}`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center"
      >
        <div className="flex flex-row items-center justify-between w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name<span style={{ color: "red" }}>&nbsp;*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Last Name<span style={{ color: "red" }}>&nbsp;*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email<span style={{ color: "red" }}>&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={withGoogle ? true : false}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password<span style={{ color: "red" }}>&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type={withGoogle ? "text" : "password"}
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={withGoogle ? true : false}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirm Password<span style={{ color: "red" }}>&nbsp;*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type={withGoogle ? "text" : "password"}
                  placeholder="Re-enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          disabled={withGoogle ? true : false}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="Enter your phone number"
                  placeholder="Phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
      {!withGoogle && (
        <>
          <div className="mt-6 space-y-4 text-center">
            <p className="text-lg mb-2">Already have an account?</p>
            <Link href="/sign-in" passHref>
              <Button className="m-15">Sign In</Button>
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-black mb-2">Or sign in with</p>
            <Button
              onClick={async () => {
                const { user, errorCode, errorMessage } = await googleSignIn();

                console.log("googleSignIn response object:");
                console.log(user, errorCode, errorMessage);

                if (errorCode && errorMessage) {
                  setErrorCode(errorCode);
                  setErrorMessage(errorMessage);
                } else if (user) {
                  router.push(`/home/${user.id}`);
                }
              }}
              variant="outline"
              className="m-15 w-full bg-white text-gray-800 hover:bg-gray-100"
            >
              Google
            </Button>
            {errorCode && errorMessage && (
              <div className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
                <p>{"Error with Google sign-in: " + errorCode + ""}</p>
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </>
      )}
    </Form>
  );
};
