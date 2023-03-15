import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase'
import { doc, getDoc, collection, onSnapshot,updateDoc,arrayUnion } from 'firebase/firestore'
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar';
import UserRatingLayout from './UserRatingLayout';
import CommentForm from './CommentForm';
import RateMovie from './RateMovie';
import PostPath from './PostPath';
import CardComponent from './CardComponent';
import PostYouMightLike from './PostYouMightLike';
import UserComments from './UserComments';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";

function DetailedPost(props) {
    // postID from url
    const { postID } = useParams();


    //get currentPost
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageTitle, setImageTitle] = useState('')
    const [writtenBy, setWrittenBy] = useState('')
    const [postType, setPostType] = useState('')
    const [postedTime, setPostedTime] = useState('')
    const [imageURL, setImageURL] = useState('')

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


     // get recent posts
     const [recentPosts, setRecentPosts] = useState([])

     const getRecentPosts = () => {
         // caching
 
         let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'));
         if (allPosts !== null && allPosts.length !== 0) {
             let tempRecentPosts = []
             if (allPosts.length <= 5) {
                 setRecentPosts(allPosts.filter((item) => {
                     return item.postedTime !== Number(postID)
                 }))
             }
             else {
                 for (let i = 0; i <= 5; i++) {
                     if (Number(postID) !== allPosts[i].postedTime) tempRecentPosts.push(allPosts[i]);
                 }
 
                 setRecentPosts(tempRecentPosts)
             }
         } else {
             const docRef = collection(firestore, 'Posts')
             onSnapshot(docRef, (snapshot) => {
                 let data = snapshot.docs.map(doc => doc.data()).filter((doc) => {
                     return doc.postedTime !== Number(props.postID)
                 })
                 setRecentPosts(data.slice(0,3))
             })
         }
     }



     const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };

    const { user } = useUserAuth()

    const navigate = useNavigate();

    const commentsDB = collection(firestore, 'Comments')

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const submitRating = async () => {
        let ref = doc(commentsDB, `${postID}`)
        let currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
        if (user !== null) {
            if (currentValue !== 0) {
                await updateDoc(ref, {
                    ratingsList: arrayUnion({
                        'email': user.email,
                        'rating': currentValue
                    })
                })
                setCurrentValue(0)
                getRatings()
            }
            else{
                console.log('null rating not accepted')
            }
        } else {
            navigate('/login')
        }
    }



    const [ratingsList, setRatingList] = useState([])
    const [ratedStars, setRatedStars] = useState([])
    const [leftStars, setLeftStars] = useState([])
    const [cumilativeRating, setCumilativeRating] = useState(0)
    const [uniqueEmail,setUniqueEmails] = useState(0)

    //get Ratings
    const getRatings = async () => {
        const uniqueUsers = new Set()
        const ref = doc(firestore, 'Comments', `${postID}`)
        const docSnap = await getDoc(ref)
        const data = docSnap.data()
        const rates = data.ratingsList
        setRatingList(rates)
        let sum = 0;
        for (let i = 0; i < rates.length; i++) {
            if(!uniqueUsers.has(rates[i].email)){
                sum += rates[i].rating;
                uniqueUsers.add(rates[i].email)
            }
        }
        setCumilativeRating(Math.floor(sum / uniqueUsers.size))
        setUniqueEmails(uniqueUsers.size)
        setRatedStars(Array(Math.floor(sum / uniqueUsers.size)).fill(1))
        setLeftStars(Array(5 - Math.floor(sum / uniqueUsers.size)).fill(0))
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
        getRecentPosts()
        getRatings()
    }, [postID])

   

    return (
        <>
            <Navbar />

            <PostPath title={title} postType={postType} />

            <CardComponent postID={postID} title={title} postedTime={postedTime} imageURL={imageURL} imageTitle={imageTitle} description={description} writtenBy={writtenBy} />

            {/* Rate the Movie */}

            <RateMovie postID={postID} postType={postType} submitRating={submitRating} currentValue={currentValue} handleClick={handleClick} handleMouseLeave={handleMouseLeave} handleMouseOver={handleMouseOver}  hoverValue={hoverValue}/>

            {/* get All Ratings */}

            <UserRatingLayout postID={postID} postType={postType} uniqueEmail={uniqueEmail} getRatings={getRatings} ratedStars={ratedStars} leftStars={leftStars}  />

            {/* Post You Might Like */}

            <PostYouMightLike recentPosts={recentPosts} postID={postID} />

            {/* Comments */}

            {/* <UserComments postID={postID}/> */}

            {/* Comment Form */}

            <CommentForm postID={postID} />

            <SocialProfiles />

        </>
    )
}

export default DetailedPost