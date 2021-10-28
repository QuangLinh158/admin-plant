import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = { 
    apiKey : "AIzaSyCcJB_3XDq_kytR0-f3hboOYRCY4bK0y20" , 
    authDomain : "appplants-fbbf8.firebaseapp.com" , 
    projectId : "appplants-fbbf8" , 
    storageBucket : "appplants-fbbf8.appspot.com" , 
    messagingSenderId : "254548627166" , 
    appId : "1:254548627166:web:160167433651fa86f0fc4f" 
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  
  export default db;
  