// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4UJ2IMmeXN85zTZUr4pDVM2piaj2wV9s",
  authDomain: "pulse-chat-975ea.firebaseapp.com",
  projectId: "pulse-chat-975ea",
  storageBucket: "pulse-chat-975ea.firebasestorage.app",
  messagingSenderId: "362617827682",
  appId: "1:362617827682:web:ec26e929620a51e9e7bc3b",
  measurementId: "G-C0LZVK3DGX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
