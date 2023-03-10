import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import ReviewItem from './ReviewItem'

function PostYouMightLike(props) {
    const [recentPosts, setRecentPosts] = useState([])
    const getRecentPosts = () => {
        // caching

        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'));
        if (allPosts!==null && allPosts.length!==0) {
            let tempRecentPosts = []
            if (allPosts.length < 3) setRecentPosts(allPosts.filter((item) => {
                return item.postedTime !== Number(props.postID)
            }))
            else {
                for (let i = 0; i < 3; i++)tempRecentPosts.push(allPosts[i]);
                setRecentPosts(tempRecentPosts.filter((item) => {
                    return item.postedTime !== Number(props.postID)
                }))
            }
        }
        const docRef = collection(firestore, 'Posts')
        const q = query(docRef, orderBy('postedTime', 'desc'), limit(3));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => doc.data()).filter((doc) => {
                return doc.postedTime !== Number(props.postID)
            })
            setRecentPosts(data)
        })
        return unsubscribe
    }
    useEffect(() => {
        getRecentPosts()
    }, [])
    return (
        <div className="container mt-2">
            <h3 className='bebasneue'>Posts You Might Also like: </h3>
            <div className="row">
                {recentPosts.map((element) => {

                    return <div key={element.postedTime} className="col-md-3">
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
        </div>
    )
}

export default PostYouMightLike