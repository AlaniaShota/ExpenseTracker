import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBnxsIs6F6mQzYDo6fxkjiwo5HDLf7cj6A",
    authDomain: "wallet-ts-7c26e.firebaseapp.com",
    projectId: "wallet-ts-7c26e",
    storageBucket: "wallet-ts-7c26e.appspot.com",
    messagingSenderId: "981326837497",
    appId: "1:981326837497:web:a5c595128338b9c6b29428",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;