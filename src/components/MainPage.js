import React from 'react'
import { firestore } from '../firebase'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar';
function MainPage() {
    const collectionRef = collection(firestore, 'Posts')
    const [topThreePosts, setTopThreePosts] = useState([])
    const getTopPosts = async () => {

        // Compound Queries

        const q = query(collectionRef, orderBy('postedTime', 'desc'), limit(3))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setTopThreePosts(snapshot.docs.map(doc => doc.data()))
        })
        return unsubscribe


        // const posts = JSON.parse(window.sessionStorage.getItem('allPosts'))
        // if(posts.length<3)setTopThreePosts(posts)
        // else{
        //     const temp = []
        // for(let i=0;i<3;i++){
        //     temp.push(posts[i]);
        // }
        // setTopThreePosts(temp)
        // }

    }
    useEffect(() => {
        getTopPosts()
    }, [])

    return (
        <>
            <Navbar />
            <SocialProfiles />
            <div className='container'>
                <h1 className='bebasneue'>Latest Posts :</h1>
                <div className="row">
                    {topThreePosts.map((element) => {
                        return <div key={element.postedTime} className="col-md-3 ">
                            <ReviewItem title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""}
                                imageURL={element.imageURL ? element.imageURL : "https://i.ytimg.com/vi/z2T9NDVpzXk/hqdefault.jpg"}
                                videoURL={element.videoURL ? element.videoURL : ''}
                                typeOfPost={element.postType}
                                id={element.postedTime}
                                titleOfPoster={element.imageTitle}
                                writtenBy={element.writtenBy}
                                yearOfRelease={element.yearOfRelease} />
                        </div>
                    })}
                </div>


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