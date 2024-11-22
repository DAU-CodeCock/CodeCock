import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore 초기화 추가

const firebaseConfig = {
  apiKey: "AIzaSyDvQ3_XnxIBsSTu3f9IKM1nh21yiU4L1Rc",
  authDomain: "soso-23ef3.firebaseapp.com",
  projectId: "soso-23ef3",
  storageBucket: "soso-23ef3.appspot.com",
  messagingSenderId: "863191310771",
  appId: "1:863191310771:web:672ecf7089e825fba8abc6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Firestore 초기화

export { auth, provider, signInWithPopup, signOut, db };