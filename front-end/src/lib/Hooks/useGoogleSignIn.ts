import {
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { GET_SINGLE_USER_BY_UID } from "@/lib/GraphQL/Users";
import { auth } from "../Firebase/Firebase";
import { User } from "@/__generated__/graphql";
import { CustomError } from "../utils";

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
      // something is wrong here when signing into google but it doesnt stop the sign-in process just means that the user is not registered onto firebase auth dashboard
      const { data } = await getUserByUid({
        variables: { uid: firebaseUser.uid },
      });
      if (!data) {
        throw new CustomError(
          "Error fetching user",
          "user.data is nullish"
        );
      }
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
