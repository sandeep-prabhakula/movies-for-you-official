import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore }from "firebase/firestore"
import { getStorage } from "firebase/storage"
import {getMessaging} from 'firebase/messaging'
import {getAnalytics} from 'firebase/analytics'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_VERCEL_API_KEY,
  authDomain: process.env.REACT_APP_VERCEL_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_VERCEL_PROJECT_ID,
  storageBucket: process.env.REACT_APP_VERCEL_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_VERCEL_MESSAGIN_SENDER_ID,
  appId: process.env.REACT_APP_VERCEL_APPLICATION_ID,
  measurementId: process.env.REACT_APP_VERCEL_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app)
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const analytics = getAnalytics(app);
export default app;