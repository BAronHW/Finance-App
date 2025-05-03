"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/app/globals.css";
import { useAuth } from "@/lib/contexts/authContext";
import { GoogleSignUpForm } from "@/components/custom/auth/GoogleSignUpForm";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  CREATE_USER,
  GET_SINGLE_USER_BY_UID,
  USERNAME_EXISTS,
} from "@/lib/graphql/Users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteUser } from "firebase/auth";

const googleSignUpFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
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
});

export type GoogleSignUpSchemaType = typeof googleSignUpFormSchema;

const SignUpPage = () => {
  const searchParams = useSearchParams();
  const firebaseUid = searchParams.get("uid");
  const router = useRouter();
  const authData = useAuth();
  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: (result) => {
      const uid = result.data.createUser.uid;
      if (uid) {
        return [{ query: GET_SINGLE_USER_BY_UID, variables: { uid } }];
      }
      return [];
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usernameExists] = useLazyQuery(USERNAME_EXISTS);

  useEffect(() => {
    if (!firebaseUid) {
      console.error(
        "Google sign up page loaded without UID - redirecting back to sign in."
      );
      router.push("/sign-in");
    }
  }, [firebaseUid]);

  const form = useForm<z.infer<typeof googleSignUpFormSchema>>({
    resolver: zodResolver(googleSignUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof googleSignUpFormSchema>) => {
    setSubmitting(true);
    try {
      const { data } = await usernameExists({
        variables: {
          username: values.username,
        },
      });
      if (data.usernameExists) {
        setErrorMessage(
          "The username is already in use, try a different one:)"
        );
      }
      if (authData.currentUser?.email) {
        const newUser = await createUser({
          variables: {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username ?? authData.currentUser.email,
            email: authData.currentUser.email,
            phone: values.phone,
            uid: firebaseUid,
          },
        });
        router.push(`/home/${newUser.data.createUser.id}`);
      } else {
        throw new Error(
          "authContext does not contain user Gmail - unable to create user."
        );
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-6">
        {authData.currentUser
          ? "Complete the sign up for your account"
          : "Signing in with Google..."}
      </h2>

      {authData.currentUser && (
        <GoogleSignUpForm
          form={form}
          onSubmit={onSubmit}
          isSubmitting={submitting}
        />
      )}
      {errorMessage && (
        <div className="flex items-center p-4 mt-8 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
          <p>{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default SignUpPage;
