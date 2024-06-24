import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYgApo2Q_yLyXrfQ6zS0xnuGgplRxQC90",
  authDomain: "special-education-jerusalem.firebaseapp.com",
  projectId: "special-education-jerusalem",
  storageBucket: "special-education-jerusalem.appspot.com",
  messagingSenderId: "827440726758",
  appId: "1:827440726758:web:1ca54a0fd429cb79123127",
  measurementId: "G-XGBW92TZP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
