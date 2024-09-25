// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNgkL_CT0xq2ZQM28dNykdgI1THwQxSko",
  authDomain: "myofunctional-therapy-app.firebaseapp.com",
  projectId: "myofunctional-therapy-app",
  storageBucket: "myofunctional-therapy-app.appspot.com",
  messagingSenderId: "190545620703",
  appId: "1:190545620703:web:378938c5967494cf03836a",
  measurementId: "G-BS5X1MCWQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);