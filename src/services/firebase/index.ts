import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { user } from '@/stores';

const firebaseConfig = {
  apiKey: "AIzaSyCNIXEVPjfm4ndnbeMNfyQwylAuzErtT14",
  authDomain: "cargasaqui.firebaseapp.com",
  projectId: "cargasaqui",
  storageBucket: "cargasaqui.appspot.com",
  messagingSenderId: "5455008520",
  appId: "1:5455008520:web:40e84524ecfaab630fd2bd"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
onAuthStateChanged(auth, userAuth => {
  console.log("auth state changed", userAuth);
  user.set(userAuth);
});