"use client";
import { ReactNode, useContext, useEffect, useCallback } from "react";
import { auth } from "@/lib/firebase/firebase";
import React, { useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  GET_SINGLE_USER_BY_UID
} from "../graphql/Users";
import { useQuery } from "@apollo/client";

interface UserQueryResponse {
  getUserByUid: {
    id: number;
    __typename: string;
  };
}

export interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  userId: number | null;
  logOut(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [authInitialised, setAuthInitialised] = useState(false);
  const router = useRouter();

  const { data: userIdData, loading: userIdLoading } =
    useQuery<UserQueryResponse>(GET_SINGLE_USER_BY_UID, {
      variables: {
        uid: currentUser?.uid,
      },
      skip: !currentUser || !currentUser.uid,
      onCompleted: (data) => {
        console.log(
          "GET_SINGLE_USERID_BY_UID query completed in AuthProvider:",
          data
        );
      },
      onError: (error) => {
        console.error("Error fetching user ID in AuthProvider:", error);
      },
    });

  console.log({ userIdData })

  const userId = userIdData?.getUserByUid?.id || null; 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Log state changed")
      console.log({user})
      if (user) {
        setCurrentUser(user);
        setUserLoggedIn(true);
        setAuthInitialised(true);
      } else {
        setUserLoggedIn(false)
      }
    });
    return () => unsubscribe();
  }, []);

  const loading = !authInitialised || userIdLoading;

  const logOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserLoggedIn(false);
      router.replace("/");
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  const value = {
    currentUser,
    userLoggedIn,
    loading,
    userId,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
