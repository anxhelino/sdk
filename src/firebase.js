// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDH0HIINDOptTHQotuPtOCG5XkSyBf2xDM',
  authDomain: 'videoapp-8687b.firebaseapp.com',
  projectId: 'videoapp-8687b',
  storageBucket: 'videoapp-8687b.appspot.com',
  messagingSenderId: '278740592123',
  appId: '1:278740592123:web:66cf3b06b226215a2f575e',
  measurementId: 'G-HK2QHGH53X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
export const db = getFirestore(app);
