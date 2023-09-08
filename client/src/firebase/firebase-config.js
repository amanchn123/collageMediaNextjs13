// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKk0CHH5p-kcFZmrl1nsJUKJslVlEAdW0",
  authDomain: "notesapp-ca846.firebaseapp.com",
  projectId: "notesapp-ca846",
  storageBucket: "notesapp-ca846.appspot.com",
  messagingSenderId: "786926361416",
  appId: "1:786926361416:web:afb40c5007bc683ea5f17d",
  measurementId: "G-ESVKY3RGGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getStorage(app);