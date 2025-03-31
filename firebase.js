import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqDY2EFGZ3rAn5F_WAfnWuiXiXpN8myss",
  authDomain: "voxa-5ee0f.firebaseapp.com",
  projectId: "voxa-5ee0f",
  storageBucket: "voxa-5ee0f.firebasestorage.app",
  messagingSenderId: "698144175953",
  appId: "698144175953"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
