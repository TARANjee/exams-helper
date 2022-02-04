import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsso_i44O2U57qM3AY9RlXe804f8hSlc0",
  authDomain: "exams-helper.firebaseapp.com",
  databaseURL: "https://exams-helper-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "exams-helper",
  storageBucket: "exams-helper.appspot.com",
  messagingSenderId: "406609336165",
  appId: "1:406609336165:web:5d1bfdb07843e3b36eb38c",
  measurementId: "G-S1DJ91SK6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

