import {
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_SINGLE_USER_BY_UID } from "@/lib/graphql/Users";
import { User } from "@/__generated__/graphql";
import { auth } from "@/lib/firebase/firebase"
import { CustomError } from "../utils";
import { useAuth } from "../contexts/authContext";

const provider = new GoogleAuthProvider();

export const useGoogleSignIn = (): {
  googleSignIn: () => Promise<{
      user: User | null;
      errorCode: string | null;
      errorMessage: string | null;
    }
  >;
  queryError: ApolloError | null;
} => {
  const [getUserByUid, { error: getUserError }] = useLazyQuery(
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

  return { googleSignIn, queryError: getUserError || null };
};
