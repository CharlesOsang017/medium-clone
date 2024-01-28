// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAq4srZgAcp8cVDI2WfpvASOSUSsPNdkGI',
  authDomain: "medium-clone-5afb5.firebaseapp.com",
  projectId: "medium-clone-5afb5",
  storageBucket: "medium-clone-5afb5.appspot.com",
  messagingSenderId: "645504808540",
  appId: "1:645504808540:web:d0f25e109428ce4df39899",
  measurementId: "G-BR2TN9R4VY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export const storage = getStorage()
export const db = getFirestore(app)