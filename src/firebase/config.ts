// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const FirebaseAuth = getAuth(app);
