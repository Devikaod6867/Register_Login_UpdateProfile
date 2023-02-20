import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAuOMnunyj1_TpnuLVlK8Vd-HvIiv99El4",
  authDomain: "regloginproject-acf8d.firebaseapp.com",
  databaseURL: "https://regloginproject-acf8d-default-rtdb.firebaseio.com",
  projectId: "regloginproject-acf8d",
  storageBucket: "regloginproject-acf8d.appspot.com",
  messagingSenderId: "605921164591",
  appId: "1:605921164591:web:a0a4b5398bff00ae4475da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage();

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
export default app;
