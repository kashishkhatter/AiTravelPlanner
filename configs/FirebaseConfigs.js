// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDozm4MRr4e30AvDFlmaNit58FRWD4pr_Q",
  authDomain: "ai-travel-planner-a1a34.firebaseapp.com",
  projectId: "ai-travel-planner-a1a34",
  storageBucket: "ai-travel-planner-a1a34.appspot.com",
  messagingSenderId: "592427414343",
  appId: "1:592427414343:web:959da0b63df47eb7585262",
  measurementId: "G-3CQHY61R34"
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with custom persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore database
export const db = getFirestore(app);
