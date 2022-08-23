// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAeOTUj9jmWJihRXKzW03AQ88YLthHMsg",
  authDomain: "finesse-prac.firebaseapp.com",
  // The value of `databaseURL` depends on the location of the database
  databaseURL:
    "https://finesse-prac-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "finesse-prac",
  storageBucket: "finesse-prac.appspot.com",
  messagingSenderId: "428115990090",
  appId: "1:428115990090:web:fd9cd895a0d63db5b678b3",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the database service and export the reference for other modules
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
