// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.VITE_AP_KEY,
  authDomain: import.meta.VITE_AUTH_DORMAIN,
  projectId: import.meta.VITE_PROJECT_ID,
  storageBucket: import.meta.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.VITE_APP_ID,
  measurementId: import.meta.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const storage = getStorage()
export const db = getFirestore(app)