import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnxsIs6F6mQzYDo6fxkjiwo5HDLf7cj6A",
    authDomain: "wallet-ts-7c26e.firebaseapp.com",
    projectId: "wallet-ts-7c26e",
    storageBucket: "wallet-ts-7c26e.appspot.com",
    messagingSenderId: "981326837497",
    appId: "1:981326837497:web:a5c595128338b9c6b29428"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;