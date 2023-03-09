import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
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

    // CommentsDB Reference
    const commentsDB = collection(firestore, 'Comments')

    //ratings given by users
    const [ratingsList, setRatingList] = useState([])
    const [ratedStars, setRatedStars] = useState([])
    const [leftStars, setLeftStars] = useState([])


    // cumilative Rating 
    const [cumilativeRating, setCumilativeRating] = useState(0)
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

    const [recentPosts, setRecentPosts] = useState([])

    const [commentsListState, setcommentsListState] = useState([])

    // get recent post other than current post
    const getRecentPosts = async () => {
        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'));
        let tempRecentPosts = []
        if (allPosts.length < 3) setRecentPosts(allPosts.filter((item) => {
            return item.postedTime !== Number(postID)
        }))
        else {
            for (let i = 0; i < 3; i++)tempRecentPosts.push(allPosts[i]);
            setRecentPosts(tempRecentPosts.filter((item) => {
                return item.postedTime !== Number(postID)
            }))
        }
    }

    // Get All comments and ratings of current post
    const getAllComments = async () => {
        const ref = doc(firestore, 'Comments', `${postID}`)
        const docSnap = await getDoc(ref)
        const data = docSnap.data()
        setcommentsListState(data.commentsList)
        // setRatingList(data.ratingsList)

    }

    //get Ratings
    const getRatings = async () => {
        const ref = doc(firestore, 'Comments', `${postID}`)
        const docSnap = await getDoc(ref)
        const data = docSnap.data()
        const rates = data.ratingsList
        setRatingList(rates)
        let sum = 0;
        for (let i = 0; i < ratingsList.length; i++) {
            sum += ratingsList[i].rating;
        }
        setCumilativeRating(Math.floor(sum / ratingsList.length))
        // setRatedStars(Array(cumilativeRating).fill(1))
        // setLeftStars(Array(5 - cumilativeRating).fill(0))
    }
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
        getRatings()
        getAllComments()
        window.scrollTo(0, 0)

        // get Data from session storage

        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'))
        if (allPosts !== null) {
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
        getRecentPosts()
    }, [postID])

    return (
        <>
            <Navbar />

            <PostPath title={title} postType={postType} />

            <CardComponent postID={postID} title={title} postedTime={postedTime} imageURL={imageURL} imageTitle={imageTitle} description={description} writtenBy={writtenBy} />

            {/* Rate the Movie */}

            <RateMovie postID={postID} postType={postType} />

            {/* get All Ratings */}
            <div className="container mt-2" style={{ display: `${postType !== 'Reviews' ? 'none' : ''}` }}>
                <h2 className='bebasneue'>User Ratings:</h2>


                {/* display all ratings */}


                {/* {ratedStars ? ratedStars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            color={colors.orange}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                        />
                    )
                }) : console.log("0")}
                {leftStars ? leftStars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            color={colors.grey}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                        />
                    )
                }) : console.log("full rating")} */}

            </div>

            {/* Post You Might Like */}

            <PostYouMightLike recentPosts={recentPosts} />

            {/* Comments */}

            {/* commented for analysing the audience perception. Remove code Comments of below line to display comments */}

            {/* <UserComments commentsListState={commentsListState}/> */}

            {/* Comment Form */}

            <CommentForm postID={postID} />

            <SocialProfiles />

        </>
    )
}

export default DetailedPost