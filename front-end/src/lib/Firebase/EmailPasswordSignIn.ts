import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_SINGLE_USER_BY_UID } from "@/src/lib/GraphQL/Users";
import { NexusGenObjects } from "@/../backend/nexus-typegen";
import { useRouter } from "next/router";
import { auth } from "./Firebase";

export const emailAndPasswordSignIn = async (
  email: string,
  password: string
): Promise<{
  user?: NexusGenObjects["User"];
  errorCode?: string;
  errorMessage?: string;
}> => {
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      const firebaseUser = result.user;
      console.log('firebase user uid:')
      console.log(firebaseUser.uid)
      const { data: user } = useQuery(GET_SINGLE_USER_BY_UID, {
        variables: { uid: firebaseUser.uid },
      });
      console.log("User object:")
      console.log(user);
      if (user) {
        return {
          user: user,
        };
      }
    })
    .catch((error) => {
      return {
        errorCode: error.code,
        errorMessage: error.message,
      };
    });
  return {
    errorCode: "User not found",
    errorMessage: "User not found"
  };
};
