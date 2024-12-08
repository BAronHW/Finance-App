import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from '@firebase/auth'
import { useQuery } from '@apollo/client'
import { GET_SINGLE_USER_BY_UID } from '@/src/lib/GraphQL/Users'
import { NexusGenObjects } from '@/../backend/nexus-typegen'
import { useRouter } from 'next/router';
import { auth } from './Firebase';

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<{
    user?: NexusGenObjects["User"],
    errorCode?: string,
    errorMessage?: string,
}> => {
  
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const firebaseUser = result.user;
      const { data: user } = useQuery(GET_SINGLE_USER_BY_UID, {
        variables: { uid: firebaseUser.uid },
      });
      console.log(user);
      if (user) {
        return {
          user: user
        }
      }
    })
    .catch((error) => {
        return {
            errorCode: error.code,
            errorMessage: error.message,
        }
    });
  return {};
};
