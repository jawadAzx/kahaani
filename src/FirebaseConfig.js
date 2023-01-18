import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAFrdTxvhwMtvvreXs-qas9XGwRsqydC7Y",
//   authDomain: "kahaanii.firebaseapp.com",
//   projectId: "kahaanii",
//   storageBucket: "kahaanii.appspot.com",
//   messagingSenderId: "670088143288",
//   appId: "1:670088143288:web:f9b8c1fb876606e6226f4d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDt5O99KO5vmeGkPVjZSKDeagfopiGgEEc",
  authDomain: "test-e0f0f.firebaseapp.com",
  projectId: "test-e0f0f",
  storageBucket: "test-e0f0f.appspot.com",
  messagingSenderId: "728198532818",
  appId: "1:728198532818:web:ba9e53dbc63715686d270b",
  measurementId: "G-9B4ZK5LJN4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app)