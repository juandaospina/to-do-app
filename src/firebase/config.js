import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCL864HKerGTx1f7AjPyVD0ryxiPLm5FEQ",
  authDomain: "react-udemy-app-c3d9c.firebaseapp.com",
  projectId: "react-udemy-app-c3d9c",
  storageBucket: "react-udemy-app-c3d9c.appspot.com",
  messagingSenderId: "82559899890",
  appId: "1:82559899890:web:094e202493325a241fd86b"
};


export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);