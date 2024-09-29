import { auth, provider } from "@/lib/Firebase";
import { GoogleAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export const firebaseGmailSignin = async (router: AppRouterInstance): Promise<void> => {
    if (typeof window === 'undefined' || !auth) {
      console.error('Auth is not available');
      return;
    }

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error("Firebase credential does not exist or can't be fetched");
      }
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        const errorCode = (error as any).code;
        const errorMessage = error.message;
        const email = (error as any).customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error as any);
        console.error("Sign-in error:", { errorCode, errorMessage, email, credential });
      }
    }
  };