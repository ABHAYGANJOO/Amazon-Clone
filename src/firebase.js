import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfVSbwfb2yPgvePfRv8hX2nyIX1F6yEJ4",
  authDomain: "clone-52b0c.firebaseapp.com",
  projectId: "clone-52b0c",
  storageBucket: "clone-52b0c.appspot.com",
  messagingSenderId: "999398084192",
  appId: "1:999398084192:web:5edda07a4713b1d13efd05",
  measurementId: "G-JY1EC9NK3L"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();


export { db, auth };