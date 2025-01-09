import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import { useGoogleSignIn } from "@/lib/hooks/useGoogleSignIn";

const GoogleSignIn = (): ReactElement => {
  const router = useRouter();
  const { googleSignIn } = useGoogleSignIn();

  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  return (
    <>
      <div className="mt-6 space-y-4 text-center">
        <p className="text-lg mb-2">Already have an account?</p>
        <Link href="/sign-in" passHref>
          <Button className="m-15">Sign In</Button>
        </Link>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-black mb-2">Or sign in with</p>
        <Button
          onClick={async () => {
            const { user, errorCode, errorMessage } = await googleSignIn();

            console.log("googleSignIn response object:");
            console.log(user, errorCode, errorMessage);

            if (errorCode && errorMessage) {
              setErrorCode(errorCode);
              setErrorMessage(errorMessage);
            } else if (user) {
              router.push(`/home/${user.id}`);
            }
          }}
          variant="outline"
          className="m-15 w-full bg-white text-gray-800 hover:bg-gray-100"
        >
          Google
        </Button>
        {errorCode && errorMessage && (
          <div className="flex items-center p-4 my-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800">
            <p>{"Error with Google sign-in: " + errorCode + ""}</p>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleSignIn;
