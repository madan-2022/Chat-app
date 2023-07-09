
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAagMUckMqNH3DgWc8C6YTh7FFzsN_xDu8",
  authDomain: "madan-chatapp.firebaseapp.com",
  projectId: "madan-chatapp",
  storageBucket: "madan-chatapp.appspot.com",
  messagingSenderId: "50587318399",
  appId: "1:50587318399:web:b24d39d3aa71d4c197274a",
  measurementId: "G-X5HF8PWZT5"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);