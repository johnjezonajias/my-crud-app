// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8eximqRmnLPGlDYhzEh_k-y4pPZFKP2Q",
  authDomain: "crud-authentication-adecc.firebaseapp.com",
  projectId: "crud-authentication-adecc",
  storageBucket: "crud-authentication-adecc.appspot.com",
  messagingSenderId: "902533775573",
  appId: "1:902533775573:web:1418436f0851371ec3e25c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
