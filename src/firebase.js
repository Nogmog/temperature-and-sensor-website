// import "dotenv/config"
console.log(import.meta.env)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// dotenv.config()
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
// const firebaseConfig = {
//   apiKey: "AIzaSyCtXyyWNIRJXoD4_OAhk4r6bhHDe1JeVRM",
//   authDomain: "airy-office-415903.firebaseapp.com",
//   projectId: "airy-office-415903",
//   storageBucket: "airy-office-415903.appspot.com",
//   messagingSenderId: "803540774756",
//   appId: "1:803540774756:web:7a600f2c09596df9939471",
//   measurementId: "G-N0FT5ZVWDJ"
// };
// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);
