import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDuqxvLrrsHxUAFLYUZH2a8we7rRVokXKQ",
  authDomain: "farmorders-56cc8.firebaseapp.com",
  projectId: "farmorders-56cc8",
  storageBucket: "farmorders-56cc8.appspot.com",
  messagingSenderId: "400987655040",
  appId: "1:400987655040:web:a81d22d677bf4d2f430f65",
  measurementId: "G-SDRSY7WQQX",
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
