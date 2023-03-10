import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar';
import UserRatingLayout from './UserRatingLayout';
import CommentForm from './CommentForm';
import RateMovie from './RateMovie';
import PostPath from './PostPath';
import CardComponent from './CardComponent';
import PostYouMightLike from './PostYouMightLike';
import UserComments from './UserComments';

function DetailedPost(props) {

    // post parameters
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageTitle, setImageTitle] = useState('')
    const [writtenBy, setWrittenBy] = useState('')
    const [postType, setPostType] = useState('')
    const [postedTime, setPostedTime] = useState('')
    const [imageURL, setImageURL] = useState('')

    // postID from url
    const { postID } = useParams();

    //get Ratings
    const getCurrentPost = async () => {
        const docRef = doc(firestore, 'Posts', `${postID}`)
        const docSnap = await getDoc(docRef)
        const currentPost = docSnap.data()
        setTitle(currentPost.title)
        setDescription(currentPost.description)
        setImageTitle(currentPost.imageTitle)
        setPostType(currentPost.postType)
        setPostedTime(currentPost.postedTime)
        setWrittenBy(currentPost.writtenBy)
        setImageURL(currentPost.imageURL)
    }

    useEffect(() => {
        //unmounts every time postID changes
        window.scrollTo(0, 0)

        // get Data from session storage
        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'))

        //cache
        if (allPosts !== null && allPosts.length !== 0) {
            allPosts = allPosts.filter((item) => {
                return item.postedTime === Number(postID)
            })
            setTitle(allPosts[0].title)
            setDescription(allPosts[0].description)
            setImageTitle(allPosts[0].imageTitle)
            setPostType(allPosts[0].postType)
            setPostedTime(allPosts[0].postedTime)
            setWrittenBy(allPosts[0].writtenBy)
            setImageURL(allPosts[0].imageURL)
        } else {
            getCurrentPost()
        }
    }, [postID])

    return (
        <>
            <Navbar />

            <PostPath title={title} postType={postType} />

            <CardComponent postID={postID} title={title} postedTime={postedTime} imageURL={imageURL} imageTitle={imageTitle} description={description} writtenBy={writtenBy} />

            {/* Rate the Movie */}

            <RateMovie postID={postID} postType={postType} />

            {/* get All Ratings */}

            <UserRatingLayout postID={postID} postType={postType}/>

            {/* Post You Might Like */}

            <PostYouMightLike postID={postID} />

            {/* Comments */}

            {/* <UserComments postID={postID}/> */}

            {/* Comment Form */}

            <CommentForm postID={postID} />

            <SocialProfiles />

        </>
    )
}

export default DetailedPost