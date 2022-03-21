import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCa5ObMFURapo-WBSbeMGqZ-QnBTSJ4hU0",
  authDomain: "movies4u-f24d1.firebaseapp.com",
  projectId: "movies4u-f24d1",
  storageBucket: "movies4u-f24d1.appspot.com",
  messagingSenderId: "154078657658",
  appId: "1:154078657658:web:081210d9b45c2f70a1cfc3",
  measurementId: "G-H8BWQZGVSW"
};

firebase.initializeApp(firebaseConfig)
export default firebase