// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyClzbDdms-cutEHh2tvM5asVxbojSUbslg",
  authDomain: "restaurant-app-2df1c.firebaseapp.com",
  projectId: "restaurant-app-2df1c",
  storageBucket: "restaurant-app-2df1c.appspot.com",
  messagingSenderId: "450020191944",
  appId: "1:450020191944:web:e2b91b7038c6a4f0f5bffd",
  measurementId: "G-1X61R4B7WB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage, auth }