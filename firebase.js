import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, collection, addDoc, serverTimestamp, getDoc, getDocs, updateDoc, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTSaOGm8S9tSvYeL08np4tBZH_bydvbIc",
  authDomain: "fb-nextjs-tailwind.firebaseapp.com",
  projectId: "fb-nextjs-tailwind",
  storageBucket: "fb-nextjs-tailwind.appspot.com",
  messagingSenderId: "269799967626",
  appId: "1:269799967626:web:0fbb019b75b7004cf3d673"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

export { storage, collection, addDoc, db, serverTimestamp, ref, uploadString, doc, getDoc, getDocs, updateDoc, getDownloadURL, query, orderBy, limit }