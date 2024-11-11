// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB8pNc8N2B7oh5KXQueXLGXImC0KUwKllc",
  authDomain: "chatapp-eee5e.firebaseapp.com",
  projectId: "chatapp-eee5e",
  storageBucket: "chatapp-eee5e.firebasestorage.app",
  messagingSenderId: "388762763378",
  appId: "1:388762763378:android:b47114910d7c5527b0c2eb",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
