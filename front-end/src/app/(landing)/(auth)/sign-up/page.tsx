"use client";

import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { CREATE_USER, GET_SINGLE_USER_BY_UID } from "@/lib/graphql/Users";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailSignUpForm } from "@/components/custom/auth/EmailSignUpForm";
import GoogleSignIn from "@/components/custom/auth/GoogleSignIn";

export const emailSignUpFormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({
      message: "Invalid email address.",
    }),
    password: z.string().min(9, {
      message: "Password must be at least 9 characters long.",
    }),
    confirmPassword: z.string().min(9, {
      message: "Password must be at least 9 characters long.",
    }),
    username: z.string().optional(),
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
    username: data.username ?? data.email,
  }));

export type EmailSignUpSchemaType = typeof emailSignUpFormSchema;

const SignUpPage = () => {
  const router = useRouter();
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: (result) => {
      const uid = result.data.createUser.uid;
      if (uid) {
        return [{ query: GET_SINGLE_USER_BY_UID, variables: { uid } }];
      }
      return [];
    },
  });

  useEffect(() => {
    console.log("SIGN UP RELOADED");
  }, []);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<EmailSignUpSchemaType>>({
    resolver: zodResolver(emailSignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<EmailSignUpSchemaType>) => {
    setEmailInUse(false);
    setSubmitting(true);
    setErrorMessage("");
    setErrorCode("");
    let firebaseUser: User | null = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      firebaseUser = userCredential.user;

      const newUser = await createUser({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          phone: values.phone,
          uid: firebaseUser.uid,
        },
      });

      router.push(`/home/${newUser.data.createUser.id}`);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode && errorCode.startsWith("auth/")) {
        if (errorCode === "auth/email-already-in-use") {
          setEmailInUse(true);
        }
        setErrorCode(errorCode);
        setErrorMessage(errorMessage);
      } else {
        if (firebaseUser) {
          console.log(
            "Attempting to delete Firebase user due to backend error..."
          );
          try {
            await deleteUser(firebaseUser); // Await the deleteUser promise
            console.log("Firebase user deleted successfully.");
          } catch (deleteError) {
            console.error(
              `Failed to delete Firebase user ${firebaseUser.uid}:`,
              deleteError
            );
          }
        }
        setErrorCode("server-error");
        setErrorMessage(
          `Profile creation failed: ${
            error.message || "Unknown error during profile creation."
          }`
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
      <EmailSignUpForm
        form={form}
        onSubmit={onSubmit}
        isSubmitting={submitting}
      />
      <GoogleSignIn signUp={true} />
      {errorCode &&
        errorMessage &&
        (emailInUse ? (
          <div className="text-center p-4 mt-6 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
            <p className="flex-1 my-2">
              Email already in use. Go to sign in instead or use a new email to
              create a new account.
            </p>
          </div>
        ) : (
          <div className="flex-column text-center p-4 mt-6 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            <p className="flex-1 my-2">Error while registering new user:</p>
            <p className="flex-1 my-2">{errorCode}</p>
            <p className="flex-1 my-2">{errorMessage}</p>
          </div>
        ))}
    </>
  );
};

export default SignUpPage;
