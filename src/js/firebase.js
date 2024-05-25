// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRrUW6Qq2VLN3meUbgjbquQ3tmuyvNOc0",
  authDomain: "lapetitetribu-bae53.firebaseapp.com",
  projectId: "lapetitetribu-bae53",
  storageBucket: "lapetitetribu-bae53.appspot.com",
  messagingSenderId: "111760072524",
  appId: "1:111760072524:web:3ac18202dec9847070f9e9"
};



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export {
  firebaseApp
}