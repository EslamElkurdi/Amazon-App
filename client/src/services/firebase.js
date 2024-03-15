import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDvQAPAvoL7uaeO7nDFOxK8LuP2d18kf8U',
  authDomain: 'first-ec3c1.firebaseapp.com',
  databaseURL: 'https://first-ec3c1-default-rtdb.firebaseio.com',
  projectId: 'first-ec3c1',
  storageBucket: 'first-ec3c1.appspot.com',
  messagingSenderId: '24568019625',
  appId: '1:24568019625:web:766af422dada967293c7b8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app) 