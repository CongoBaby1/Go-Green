import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAK5faQtwiC0SCumaylLFZbz_rk1F2_omUU",
  authDomain: "go-green-622e3.firebaseapp.com",
  projectId: "go-green-622e3",
  storageBucket: "go-green-622e3.firebasestorage.app",
  messagingSenderId: "1028958219472",
  appId: "1:1028958219472:web:68519ad08843afbb7a82d5",
  measurementId: "G-XSF7ZBWNSR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence so the app works without a signal
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('[Firebase] Multiple tabs open, persistence enabled in first tab only.');
  } else if (err.code === 'unimplemented') {
    console.warn('[Firebase] Browser does not support offline persistence.');
  }
});

export default app;
