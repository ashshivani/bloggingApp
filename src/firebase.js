// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDFlJeexKCe2R5yvwGKaoZzd5C0XH3LFQM",
    authDomain: "my-blog-1cc55.firebaseapp.com",
    projectId: "my-blog-1cc55",
    storageBucket: "my-blog-1cc55.appspot.com",
    messagingSenderId: "707175738597",
    appId: "1:707175738597:web:ff053ec2e8b95c145b380c"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
export const googleProvider = new GoogleAuthProvider();