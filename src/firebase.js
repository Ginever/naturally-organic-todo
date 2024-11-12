import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDeqHyiq8ntnao97RTEEsYwXKT3_MfxiJ4",
    authDomain: "naturally-organic-todo.firebaseapp.com",
    projectId: "naturally-organic-todo",
    storageBucket: "naturally-organic-todo.firebasestorage.app",
    messagingSenderId: "238472745652",
    appId: "1:238472745652:web:02f6b912667578b5867de1"
  };

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);