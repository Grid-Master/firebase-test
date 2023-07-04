// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDwL_M74_KqN1Tvq8yf0WAiUFemmQUjlzI',
  authDomain: 'fir-1-19d7b.firebaseapp.com',
  projectId: 'fir-1-19d7b',
  storageBucket: 'fir-1-19d7b.appspot.com',
  messagingSenderId: '184160332915',
  appId: '1:184160332915:web:3bd319ae1b0ae4f1dd8e06',
  measurementId: 'G-KBSZ2Q78MN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
