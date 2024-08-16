import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyDiVpOylxOB_nRPObN8Bu5P-hV_CVeIDDE",
  authDomain: "social-app-e5b66.firebaseapp.com",
  projectId: "social-app-e5b66",
  storageBucket: "social-app-e5b66.appspot.com",
  messagingSenderId: "1042256953038",
  appId: "1:1042256953038:web:4eae2158f6f360d87c9a9f",
  measurementId: "G-7JLYTC8ZNB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
