import React from 'react'
import { firestore } from '../firebase'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar';
import Carousal from './Carousal';
import { virtualCards } from '../dummyDataAPI'
function MainPage() {
    const [slides, setSlides] = useState([])
    const getTopPosts = async () => {

        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'));
        if (allPosts !== null && allPosts.length !== 0) {
            setSlides(JSON.parse(window.sessionStorage.getItem('allPosts')))
        }else{
            const docRef = collection(firestore, 'Posts')
             onSnapshot(docRef, (snapshot) => {
                 let data = snapshot.docs.map(doc => doc.data()).reverse()
                 setSlides(data)
             })
        }


    }
    useEffect(() => {
        getTopPosts()
    }, [])

    return (
        <>
            <Navbar />
            <SocialProfiles />
            <div className='container'>

                <Carousal postType='Exclusive Updates' slides={slides.filter((item) => {
                    return item.postType === 'Exclusive Updates'
                })} />

                <Carousal postType='Latest Updates' slides={slides.filter((item) => {
                    return item.postType === 'Latest Updates'
                })} />

                <Carousal postType='Latest Buzz' slides={slides.filter((item) => {
                    return item.postType === 'Latest Buzz'
                })} />

                <Carousal postType='Reviews' slides={slides.filter((item) => {
                    return item.postType === 'Reviews'
                })} />

                <Carousal postType='Suggestions' slides={slides.filter((item) => {
                    return item.postType === 'Suggestions'
                })} />

                <Carousal postType='Box Office Collections' slides={slides.filter((item) => {
                    return item.postType === 'Box Office Collections'
                })} />



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