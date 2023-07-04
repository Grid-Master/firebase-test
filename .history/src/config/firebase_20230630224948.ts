import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDwL_M74_KqN1Tvq8yf0WAiUFemmQUjlzI',
  authDomain: 'fir-1-19d7b.firebaseapp.com',
  projectId: 'fir-1-19d7b',
  storageBucket: 'fir-1-19d7b.appspot.com',
  messagingSenderId: '184160332915',
  appId: '1:184160332915:web:3bd319ae1b0ae4f1dd8e06',
  measurementId: 'G-KBSZ2Q78MN',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
