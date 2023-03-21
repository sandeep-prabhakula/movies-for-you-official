import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import AboutUs from "./components/AboutUs";
import DetailedPost from "./components/DetailedPost";
import React, { useState } from "react";
import MainPage from "./components/MainPage";
import { useEffect } from "react";
import { firestore } from './firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import Disclaimer from "./components/Disclaimer";
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import NotFound from "./components/NotFound";
import OneSignal from 'react-onesignal';
import SuggestionsGenre from "./components/SuggestionsGenre";
import Suggestions from "./components/Suggestions";
import DetailedReview from "./components/DetailedReview";
import DetailedSuggestion from "./components/DetailedSuggestion";
import Reviews from "./components/Reviews";
function App() {
  const collectionRef = collection(firestore, 'Posts')
  const suggestionRef = collection(firestore, 'Suggestions')
  const reviewRef = collection(firestore, 'Reviews')
  const runOneSignal = async () => {
    await OneSignal.init({ appId: process.env.REACT_APP_ONE_SIGNAL_APP_ID, allowLocalhostAsSecureOrigin: true });
    OneSignal.showSlidedownPrompt();

  }

  const [allPosts, setAllPosts] = useState([])
  const [suggestions, SetSuggestions] = useState([])
  const [reviews, setReviews] = useState([])

  const getAllPosts = async () => {
    onSnapshot(collectionRef, (snapshot) => {
      window.sessionStorage.setItem('allPosts', JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
      window.localStorage.setItem('allPosts', JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
    })
    setAllPosts(JSON.parse(window.sessionStorage.getItem('allPosts')))
  }

  const getSuggestions = async () => {
    onSnapshot(suggestionRef, (snapshot) => {
      SetSuggestions(snapshot.docs.map(doc => doc.data()).reverse())
      window.sessionStorage.setItem("suggestions", JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
      window.localStorage.setItem("suggestions", JSON.stringify(suggestions))
    })
  }

  const getReviews = async () => {
    onSnapshot(reviewRef, (snapshot) => {
      setReviews(snapshot.docs.map(doc => doc.data()).reverse())
      window.sessionStorage.setItem("reviews", JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
      window.localStorage.setItem("reviews", JSON.stringify(reviews))
    })  
  }

  useEffect(() => {

    runOneSignal()
    // getAllPosts()
    // getSuggestions()
    // getReviews()

  }, [])

  return (
    <>
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/exclusive-updates" element={<Home postType="Exclusive Updates" />} />
            <Route exact path="/reviews" element={<Reviews/>} />
            <Route exact path='/latest-buzz' element={<Home postType='Latest Buzz' />} />
            <Route exact path="/suggestions" element={<SuggestionsGenre />} />
            <Route exact path="/box-office-collections" element={<Home postType="Box Office Collections" />} />
            <Route exact path="/login" element={<Login />} />
            {/* <Route exact path="/add-post" element={<ProtectedRoute><AddPost/></ProtectedRoute>}/> */}
            <Route exact path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path='/latest-updates' element={<Home postType='Latest Updates' />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
            <Route exact path='/terms-and-conditions' element={<TermsAndConditions />} />
            <Route exact path='/about-us' element={<AboutUs />} />
            <Route exact path="/contact-us" element={<ContactUs />} />
            <Route path='/posts/:postID' element={<DetailedPost allPosts={allPosts} />} />
            <Route exact path='/disclaimer' element={<Disclaimer />} />
            <Route path='/suggestions/:genre' element={<Suggestions suggestions={suggestions}/>} />
            <Route path='*' element={<NotFound />} />
            <Route path='/reviews/:reviewID' element={<DetailedReview/>}/>
            <Route path='/suggestion/:suggestionID' element={<DetailedSuggestion/>}/>
          </Routes>
          <Footer></Footer>
        </Router>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
