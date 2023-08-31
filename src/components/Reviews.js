import { collection, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { firestore } from '../firebase'
import Navbar from './NavBar'
import ReviewCardItem from './ReviewCardItem'
import SocialProfiles from './SocialProfiles'
import { Helmet } from 'react-helmet-async'
import Loader from './Loader'
import { useQuery } from '@tanstack/react-query'

function Reviews() {
    const cacheReviews = JSON.parse(window.sessionStorage.getItem('reviews'))
    const collectionRef = collection(firestore, "Reviews")
    const getReviews = async () => {
        let posts;
        if (cacheReviews !== null && cacheReviews.length !== 0) {
            posts = cacheReviews;
        } else {
            onSnapshot(collectionRef, (snapshot) => {
                posts = snapshot.docs.map(doc => doc.data()).reverse()
                window.sessionStorage.setItem('reviews', JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
            })
        }
        return posts;
    }

    const { isLoading, isError, data, error } = useQuery(
        ['getReviews'],
        getReviews
        )

    if(isLoading)return <Loader/>
    if(isError)return <div className='alert alert-danger'>{error}</div>
    return (
        <>
            <Helmet>
                <title>Reviews</title>
            </Helmet>
            <Navbar />
            <SocialProfiles />
            <div className="container mt-2">
                <div className="row">
                    {data.map((element) => {
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