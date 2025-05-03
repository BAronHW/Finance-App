import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGoogleSignIn } from "@/lib/hooks/useGoogleSignIn";

type Props = {
  signUp: boolean;
}

const GoogleSignIn = ({ signUp }: Props) => {
  const router = useRouter();
  const { googleSignIn } = useGoogleSignIn();

  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [signingIn, setSigningIn] = useState(false)

  return (
    <>
      {signUp && (
        <div className="mt-6 space-y-4 text-center">
          <p className="text-md font-light mb-2">Already have an account?</p>
          <Link href="/sign-in" passHref>
            <Button variant="secondary" className="m-15 w-full">
              Sign In
            </Button>
          </Link>
        </div>
      )}
      <div className="mt-4 text-center">
        <p className="text-md font-light text-black mb-2">Or sign in with</p>
        <Button
          onClick={async () => {
            setSigningIn(true)
            const { firebaseUser, user, error } = await googleSignIn();

            if (error) {
              setErrorCode(error.code);
              setErrorMessage(error.message);
            } else if (user) {
              router.push(`/home/${user.id}`);
            } else if (firebaseUser && !user) {
              router.push(`/google-sign-up?uid=${firebaseUser.uid}`);
            } else {
              setErrorCode("Unknown Error");
              setErrorMessage("Google sign in failed - pleased try again.");
            }
            setSigningIn(false)
          }}
          variant="outline"
          className="m-15 w-full bg-white text-gray-800 hover:bg-gray-100"
          disabled={signingIn}
        >
          Google
        </Button>
        {errorCode && errorMessage && (
          <div className="flex flex-col gap-4 items-center p-4 mt-8 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            <p>Error with Google sign-in:</p>
            <p>{errorCode}</p>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleSignIn;
