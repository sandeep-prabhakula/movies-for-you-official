import React from 'react'
import { firestore } from '../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar';
import Carousal from './Carousal';
import ReviewCarousel from './ReviewCarousel';
import SuggestionCarousel from './SuggestionCarousel';
import AdContent from './AdContent';
import { getAnalytics, logEvent } from 'firebase/analytics'
import { Helmet } from 'react-helmet-async';
import Loader from './Loader';

function MainPage() {


    const [slides, setSlides] = useState([])
    const [reviews, setReviews] = useState([])
    const [suggestions, setSuggestions] = useState([])

    const getTopPosts = async () => {

        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'));
        if (allPosts !== null && allPosts.length !== 0) {
            setSlides(JSON.parse(window.sessionStorage.getItem('allPosts')))
        } else {
            const docRef = collection(firestore, 'Posts')
            onSnapshot(docRef, (snapshot) => {
                let data = snapshot.docs.map(doc => doc.data()).reverse()
                window.sessionStorage.setItem('allPosts', JSON.stringify(data))
                setSlides(data)
            })
        }
    }

    const getReviews = async () => {
        let allReviews = JSON.parse(window.sessionStorage.getItem('reviews'))
        if (allReviews !== null && allReviews.length !== 0) {
            setReviews(allReviews)
        } else {
            const docRef = collection(firestore, 'Reviews')
            onSnapshot(docRef, (snapshot) => {
                let data = snapshot.docs.map(doc => doc.data()).reverse()
                window.sessionStorage.setItem('reviews', JSON.stringify(data))
                setReviews(data)
            })
        }
    }

    const getSuggestions = async () => {
        let allSuggestions = JSON.parse(window.sessionStorage.getItem('suggestions'))
        if (allSuggestions !== null && allSuggestions.length !== 0) {
            setSuggestions(allSuggestions)
        } else {
            const docRef = collection(firestore, "Suggestions")
            onSnapshot(docRef, (snapshot) => {
                let data = snapshot.docs.map(doc => doc.data()).reverse()
                window.sessionStorage.setItem('suggestions', JSON.stringify(data))
                setSuggestions(data)
            })
        }
    }

    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics, "HomePage")
        getTopPosts()
        getReviews()
        getSuggestions()
    }, [])
    if (slides.length === 0 || reviews.length === 0 || suggestions.length === 0) return <Loader />

    return (
        <>
            <Helmet>
                <title>Movies4U Official</title>
                <meta property='og:title' content='Movies4U Official' />
                <meta property='og:description' content='Movies4U official is the best site ever to circulate movie updates, reviews and suggestions with best in class user-experience and lot of exclusive and real content. Provides exclusive updates on upcoming movies and trending topics' />
                <meta property='og:image' content='/logo.jpg' />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content='movies4u_officl' />
            </Helmet>
            <Navbar />
            <SocialProfiles />
            <div className='container'>

                {/* <Carousal postType='Exclusive Updates' slides={slides.filter((item) => {
                    return item.postType === 'Exclusive Updates'
                })} />

                <Carousal postType='Latest Updates' slides={slides.filter((item) => {
                    return item.postType === 'Latest Updates'
                })} />
                <AdContent /> */}
                <Carousal postType='News' slides={slides} />

                <ReviewCarousel reviews={reviews} />
                <AdContent />
                <SuggestionCarousel suggestions={suggestions} />

                {/* <Carousal postType='Box Office Collections' slides={slides.filter((item) => {
                    return item.postType === 'Box Office Collections'
                })} /> */}



                {/* Youtube Embeds */}

                {/* <div className="col my-3 ms-3">
                    <h3 className="bebasneue">Recent Uploads: </h3>

                    <iframe className='me-2 ms-2 mb-2' src={`https://www.youtube.com/embed?max-results=1&listType=playlist&type=video&list=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&index=1`} ></iframe>

                    <iframe className='me-2 ms-2 mb-2' src={`https://www.youtube.com/embed?listType=playlist&list=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&index=2`} ></iframe>

                    <iframe className='me-2 ms-2 mb-2' src={`https://www.youtube.com/embed?listType=playlist&list=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&index=3`} ></iframe>

                    <iframe className='me-2 ms-2 mb-2' src={`https://www.youtube.com/embed?listType=playlist&list=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&index=4`} ></iframe>

                    <iframe className='me-2 ms-2 mb-2' src={`https://www.youtube.com/embed?listType=playlist&list=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&index=5`} ></iframe>

                    <iframe className='me-2 ms-2 mb-2' src={`https://www.youtube.com/embed?tistType=playlist&list=${process.env.REACT_APP_YOUTUBE_CHANNEL_ID}&index=7`} ></iframe>

                </div> */}

            </div>

        </>
    )
}

export default MainPage