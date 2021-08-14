import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBPrBm90jw5hRzy-vPSkVOh-9awfRBs8XY",
    authDomain: "video-chat-777a9.firebaseapp.com",
    projectId: "video-chat-777a9",
    storageBucket: "video-chat-777a9.appspot.com",
    messagingSenderId: "721083740041",
    appId: "1:721083740041:web:036e2169a8012571443b58",
    measurementId: "G-9XM15HPTRM"
};

const app = firebase.initializeApp(firebaseConfig);

export const firestore = app.firestore();
export const auth = app.auth();

export default app;