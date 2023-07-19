import { collection, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase'
import Navbar from './NavBar'
import ReviewCardItem from './ReviewCardItem'
import SocialProfiles from './SocialProfiles'
import { Helmet } from 'react-helmet-async'
import Loader from './Loader'

function Reviews() {
    const cacheReviews = JSON.parse(window.sessionStorage.getItem('reviews'))
    const collectionRef = collection(firestore, "Reviews")
    const [reviews, setReviews] = useState([])
    const getReviews = async () => {
        if (cacheReviews !== null && cacheReviews.length !== 0) {
            setReviews(cacheReviews)
        } else {
            onSnapshot(collectionRef, (snapshot) => {
                setReviews(snapshot.docs.map(doc => doc.data()).reverse())
                window.sessionStorage.setItem('reviews', JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
            })
        }
    }
    useEffect(() => {
        getReviews()
    }, [])
    if(reviews.length===0)return <Loader/>
    return (
        <>
            <Helmet>
                <title>Reviews</title>
            </Helmet>
            <Navbar />
            <SocialProfiles />
            <div className="container mt-2">
                <div className="row">
                    {reviews.map((element) => {
                        return <div className='col-md-4' key={element.postedTime}>
                            <ReviewCardItem id={element.postedTime}
                                imageURL={element.imageURL}
                                title={element.title}
                            />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Reviews