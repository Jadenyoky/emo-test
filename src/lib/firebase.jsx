// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkK4SjMh6uAXrcGAUbaYEHP0KRmBuOsHM",
  authDomain: "impr-t.firebaseapp.com",
  projectId: "impr-t",
  storageBucket: "impr-t.firebasestorage.app",
  messagingSenderId: "438287941173",
  appId: "1:438287941173:web:d3a5eccd73511b85af7b7c",
  measurementId: "G-FLFBYL389M",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
