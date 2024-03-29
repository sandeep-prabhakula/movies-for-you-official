import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { firestore } from '../firebase'
import { doc, getDoc, collection, onSnapshot, updateDoc, arrayUnion, query, orderBy, limit } from 'firebase/firestore'
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar';
import CommentForm from './CommentForm';
import PostPath from './PostPath';
import CardComponent from './CardComponent';
import PostYouMightLike from './PostYouMightLike';
import UserComments from './UserComments';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import AdContent from './AdContent';
import MetaDecorator from './MetaDecorator';
import { getAnalytics, logEvent } from 'firebase/analytics'
import Loader from './Loader';

function DetailedPost(props) {
    // postID from url
    const {postID}  = useParams()


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
        setPostType("News")
        setPostedTime(currentPost.postedTime)
        setWrittenBy(currentPost.writtenBy)
        setImageURL(currentPost.imageURL)
    }


    // get recent posts
    const [recentPosts, setRecentPosts] = useState([])

    const getRecentPosts = () => {
        // caching

        let allPosts = JSON.parse(window.sessionStorage.getItem('recentPosts'));
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
            const q = query(docRef, orderBy('postedTime', 'desc'), limit(6))
            onSnapshot(q, (snapshot) => {
                let data = snapshot.docs.map(doc => doc.data()).filter((item) => {
                    return item.postedTime !== Number(postID)
                })
                window.sessionStorage.setItem('recentPosts', JSON.stringify(data))
                setRecentPosts(data)
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
            else {
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
    const [uniqueEmail, setUniqueEmails] = useState(0)

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
            if (!uniqueUsers.has(rates[i].email)) {
                sum += rates[i].rating;
                uniqueUsers.add(rates[i].email)
            }
        }
        setCumilativeRating(Math.floor(sum / uniqueUsers.size))
        setUniqueEmails(uniqueUsers.size)
        setRatedStars(Array(Math.floor(sum / uniqueUsers.size)).fill(1))
        setLeftStars(Array(5 - Math.floor(sum / uniqueUsers.size)).fill(0))
    }


    const getAllPosts = async () => {
        const collectionRef = collection(firestore, "Posts")
        onSnapshot(collectionRef, (snapshot) => {
            window.sessionStorage.setItem('allPosts', JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
        })
    }

    const getSuggestions = async () => {
        const suggestionRef = collection(firestore, "Suggestions")
        onSnapshot(suggestionRef, (snapshot) => {
            window.sessionStorage.setItem("suggestions", JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
        })
    }

    const getReviews = async () => {
        const reviewRef = collection(firestore, "Reviews")
        onSnapshot(reviewRef, (snapshot) => {
            window.sessionStorage.setItem("reviews", JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
        })
    }


    useEffect(() => {
        //unmounts every time postID changes
        const analytics = getAnalytics();
        logEvent(analytics, title)
        window.scrollTo(0, 0)
        getCurrentPost()
        setTimeout(() => {
            getRecentPosts()
        }, 4000)
        
        setTimeout(() => {
            const cachedAllPosts = JSON.parse(window.sessionStorage.getItem('allPosts'))
            if (cachedAllPosts === null) getAllPosts()
        }, 6000)

        setTimeout(() => {
            const cachedReviews = JSON.parse(window.sessionStorage.getItem('reviews'))
            if (cachedReviews === null) getReviews()
        }, 6000)

        setTimeout(() => {
            const cachedSuggestions = JSON.parse(window.sessionStorage.getItem('suggestions'))
            if (cachedSuggestions === null) getSuggestions()
        }, 6000)

        // getRatings()
    }, [postID])


    return (
        <>
            <Navbar />
            <MetaDecorator title={title} description={description} imageURL={imageURL} />
            <PostPath title={title} postType={postType} />

            <AdContent />

            <CardComponent postID={postID} title={title} postedTime={postedTime} imageURL={imageURL} description={description} writtenBy={writtenBy} />

            {/* Post You Might Like */}

            <AdContent />

            {recentPosts.length===0?<Loader/>:<PostYouMightLike recentPosts={recentPosts} postID={postID} />}

            {/* Comments */}

            {/* <UserComments postID={postID}/> */}

            {/* Comment Form */}

            <CommentForm postID={postID} />

            <SocialProfiles />

        </>
    )
}

export default DetailedPost