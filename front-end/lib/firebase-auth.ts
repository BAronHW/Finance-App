// lib/firebase-auth.ts
import { auth, provider } from "@/lib/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const firebaseGmailSignin = async (
    router: AppRouterInstance, 
    login: (token: string) => Promise<void>
): Promise<void> => {
    try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken(true); // Force token refresh
        
        await login(idToken);
        
        // Only redirect after successful login
        if (auth.currentUser) {
            router.push('/');
        }
    } catch (error) {
        console.error("Sign-in error:", error);
        throw error;
    }
};