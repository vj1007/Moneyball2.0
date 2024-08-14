// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkLtrS7x3bl2hm0JDI4k0jlImUubslVtQ",
  authDomain: "player-selection-tool.firebaseapp.com",
  projectId: "player-selection-tool",
  storageBucket: "player-selection-tool.appspot.com",
  messagingSenderId: "357487267488",
  appId: "1:357487267488:web:3dd51fa47fc9587cc583c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default (app,auth)