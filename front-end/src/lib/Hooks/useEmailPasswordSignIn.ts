import {
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { GET_SINGLE_USER_BY_UID } from "@/src/lib/GraphQL/Users";
import { NexusGenObjects } from "@/../backend/nexus-typegen";
import { useRouter } from "next/router";
import { auth } from "../Firebase/Firebase";

export const useEmailPasswordSignIn = (): {
  emailPasswordSignIn: (
    email: string, password: string
  ) => Promise<{
      user: NexusGenObjects["User"] | null;
      errorCode: string | null;
      errorMessage: string | null;
    }
  >;
  queryError: ApolloError | null;
} => {
  const [getUserByUid, { error: getUserError }] = useLazyQuery(
    GET_SINGLE_USER_BY_UID
  );

  const emailPasswordSignIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = result.user;
      const { data: data } = await getUserByUid({
        variables: { uid: firebaseUser.uid },
      });

      return {
        user: data?.user || null,
        errorCode: null,
        errorMessage: null,
      };
    } catch (error: any) {
      return {
        user: null,
        errorCode: error.code || "SIGN_IN_ERROR",
        errorMessage:
          error.message || "An error occurred when trying to sign in.",
      };
    }
  };

  return { emailPasswordSignIn, queryError: getUserError || null };
};
