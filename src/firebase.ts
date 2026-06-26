import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCereZSSx1FdINQm95dXaT81QuQIedXCo",
  authDomain: "the-green-grower.firebaseapp.com",
  projectId: "the-green-grower",
  storageBucket: "the-green-grower.firebasestorage.app",
  messagingSenderId: "1017472176359",
  appId: "1:1017472176359:web:ba025b44c53a79b6419242",
  measurementId: "G-NRL71MX7Z3"
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
