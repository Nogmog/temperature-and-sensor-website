import { initializeApp } from "firebase/app";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VUE_APP_apiKey,
  authDomain: import.meta.env.VUE_APP_authDomain,
  projectId: import.meta.env.VUE_APP_projectId,
  storageBucket: import.meta.env.VUE_APP_storageBucket,
  messagingSenderId: import.meta.env.VUE_APP_messagingSenderId,
  appId: import.meta.env.VUE_APP_appId,
  measurementId: import.meta.env.VUE_APP_measurementId
};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);
