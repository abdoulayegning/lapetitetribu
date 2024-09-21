import { initializeApp } from "firebase/app";
import { getDatabase, push, ref } from "firebase/database";
 
const firebaseConfig = {
  apiKey: "AIzaSyCRrUW6Qq2VLN3meUbgjbquQ3tmuyvNOc0",
  authDomain: "lapetitetribu-bae53.firebaseapp.com",
  databaseURL: "https://lapetitetribu-bae53-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lapetitetribu-bae53",
  storageBucket: "lapetitetribu-bae53.appspot.com",
  messagingSenderId: "111760072524",
  appId: "1:111760072524:web:3ac18202dec9847070f9e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function addNewDeckDownload(email, fullname){
  let data = {
    date: new Date().toString(),
    fullname: fullname,
    email: email,
  }
  push(ref(database, 'crm/deck/'), data)
  .then(()=>{
    window.open('./La_Petite_Tribu_Deck.pdf')
  })
}