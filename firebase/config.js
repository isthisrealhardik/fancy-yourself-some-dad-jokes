// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDhamtBTDZWPd0KrxkepMZv3YaQJ3wRO0",
  authDomain: "doth-thee-liketh-shakespeare.firebaseapp.com",
  projectId: "doth-thee-liketh-shakespeare",
  storageBucket: "doth-thee-liketh-shakespeare.appspot.com",
  messagingSenderId: "330022825539",
  appId: "1:330022825539:web:3e4d9d77fc7e6c6f036ef6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

export default app;