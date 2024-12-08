import {
  AuthError,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "@firebase/auth";
import { ApolloError, useLazyQuery, useQuery } from "@apollo/client";
import { GET_SINGLE_USER_BY_UID } from "@/src/lib/GraphQL/Users";
import {
  NexusGenAbstractsUsingStrategyResolveType,
  NexusGenObjects,
} from "@/../backend/nexus-typegen";
import { useRouter } from "next/router";
import { auth } from "../Firebase/Firebase";

const provider = new GoogleAuthProvider();

export const useGoogleSignIn = (): {
  googleSignIn: () => Promise<{
      user: NexusGenObjects["User"] | null;
      errorCode: string | null;
      errorMessage: string | null;
    }
  >;
  queryError: ApolloError | null;
} => {
  const [getUserByUid, { data: user, error: getUserError }] = useLazyQuery(
    GET_SINGLE_USER_BY_UID
  );

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const { data } = await getUserByUid({
        variables: { uid: firebaseUser.uid },
      });
      return {
        user: data.user || null,
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

  return { googleSignIn, queryError: getUserError || null };
};
