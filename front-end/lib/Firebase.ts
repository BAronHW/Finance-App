// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWWQN8UUOXE_Yjsv-xSIFj1vW9ihBV_qg",
  authDomain: "finapp-2c37c.firebaseapp.com",
  projectId: "finapp-2c37c",
  storageBucket: "finapp-2c37c.appspot.com",
  messagingSenderId: "604948404285",
  appId: "1:604948404285:web:94d33133d9bf035bb5b254",
  measurementId: "G-HCB3683S1V"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider();