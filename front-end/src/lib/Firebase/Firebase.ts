// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2kTJkqxMphT9EiQQPEiZQigRaxhmN2t8",
  authDomain: "finapp-c1526.firebaseapp.com",
  projectId: "finapp-c1526",
  storageBucket: "finapp-c1526.appspot.com",
  messagingSenderId: "934450567560",
  appId: "1:934450567560:web:28a80b4df094afe0b5c23d",
  measurementId: "G-C34G7HB1T7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
