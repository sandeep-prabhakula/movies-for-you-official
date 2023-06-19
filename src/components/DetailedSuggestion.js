import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, collection, onSnapshot, updateDoc, arrayUnion, query, orderBy, limit } from 'firebase/firestore'
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from 'react-router-dom';
import PostYouMightLike from './PostYouMightLike';
import RateMovie from './RateMovie';
import UserComments from './UserComments';
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar'
import PostPath from './PostPath'
import SuggestionCardComponent from './SuggestionCardComponent';
import { firestore } from '../firebase';
import UserRatingLayout from './UserRatingLayout';
import CommentForm from './CommentForm';
import MetaDecorator from './MetaDecorator';
import { getAnalytics, logEvent } from 'firebase/analytics';

function DetailedSuggestion() {
    const { suggestionID } = useParams()

    // get current suggestion
    const [censorRating, setCensorRating] = useState('')
    const [description, setDescription] = useState('')
    const [directedBy, setDirectedBy] = useState('')
    const [genre, setGenre] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [language, setLanguage] = useState('')
    const [postedTime, setPostedTime] = useState(0)
    const [runTime, setRunTime] = useState('')
    const [title, setTitle] = useState('')
    const [whereToWatch, setWhereToWatch] = useState('')
    const [writtenBy, setWrittenBy] = useState('')
    const [yearOfRelease, setYearOfRelease] = useState('')

    const getCurrentSuggestion = async () => {
        const docRef = doc(firestore, "Suggestions", `${suggestionID}`)
        const docSnap = await getDoc(docRef)
        const currentPost = docSnap.data()
        setCensorRating(currentPost.censorRating)
        setDescription(currentPost.description)
        setDirectedBy(currentPost.directedBy)
        setGenre(currentPost.genre)
        setImageURL(currentPost.imageURL)
        setLanguage(currentPost.language)
        setPostedTime(currentPost.postedTime)
        setRunTime(currentPost.runTime)
        setTitle(currentPost.title)
        setWhereToWatch(currentPost.whereToWatch)
        setWrittenBy(currentPost.writtenBy)
        setYearOfRelease(currentPost.yearOfRelease)
    }

    const [recentPosts, setRecentPosts] = useState([])

    const getRecentPosts = () => {
        // caching

        let cachedRecentPosts = JSON.parse(window.sessionStorage.getItem('recentPosts'));
        if (cachedRecentPosts !== null && cachedRecentPosts.length !== 0) {
            // console.log(cachedRecentPosts)
            let tempRecentPosts = []
            if (cachedRecentPosts.length <= 5) {
                setRecentPosts(cachedRecentPosts.filter((item) => {
                    return item.postedTime !== Number(suggestionID)
                }))
            }
            else {
                for (let i = 0; i < cachedRecentPosts.length; i++) {
                    if (Number(suggestionID) !== cachedRecentPosts[i].postedTime) tempRecentPosts.push(cachedRecentPosts[i]);
                }

                setRecentPosts(tempRecentPosts)
            }
        } else {
            const docRef = collection(firestore, 'Posts')
            const reviewRef = collection(firestore,'Reviews')
            const suggestionRef = collection(firestore,'Suggestions')
            let data = []
            const q = query(docRef,orderBy('postedTime','desc'),limit(5))
            onSnapshot(q, (snapshot) => {
                data = snapshot.docs.map(doc => doc.data()).filter((doc) => {
                    return doc.postedTime !== Number(suggestionID)
                })
                window.sessionStorage.setItem('recentPosts',JSON.stringify(data))
            })
            const reviewQ = query(reviewRef,orderBy('postedTime','desc'),limit(2))
            onSnapshot(reviewQ,(snapshot)=>{
                data = data.concat(snapshot.docs.map(doc=>doc.data()).filter((item)=>{
                    return doc.postedTime !== Number(suggestionID)
                }))
                window.sessionStorage.setItem('recentPosts',JSON.stringify(data))
            })
            const suggestionQ = query(suggestionRef,orderBy('postedTime','desc'),limit(2))
            onSnapshot(suggestionQ,(snapshot)=>{
                data = data.concat(snapshot.docs.map(doc=>doc.data()).filter((item)=>{
                    return item.postedTime!== Number(suggestionID)
                }))
                window.sessionStorage.setItem('recentPosts',JSON.stringify(data))
            })
            data = data.sort((a, b)=> { 
                return a.postedTime - b.postedTime 
              })
              window.sessionStorage.setItem('recentPosts',JSON.stringify(data))
              data = JSON.parse(window.sessionStorage.getItem('recentPosts'))
            setRecentPosts(data)
            // console.log(recentPosts)
        }
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
        let ref = doc(commentsDB, `${suggestionID}`)
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
        const ref = doc(firestore, 'Comments', `${suggestionID}`)
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


    useEffect(() => {
        const analytics = getAnalytics();
        logEvent(analytics,title)
        window.scrollTo(0, 0)
        setRatedStars([])
        setLeftStars([])
        let allSuggestions = JSON.parse(window.sessionStorage.getItem('suggestions'))
        if (allSuggestions !== null && allSuggestions.length !== 0) {
            allSuggestions = allSuggestions.filter((item) => {
                return item.postedTime === Number(suggestionID)
            })
            setCensorRating(allSuggestions[0].censorRating)
            setDescription(allSuggestions[0].description)
            setDirectedBy(allSuggestions[0].directedBy)
            setGenre(allSuggestions[0].genre)
            setImageURL(allSuggestions[0].imageURL)
            setLanguage(allSuggestions[0].language)
            setPostedTime(allSuggestions[0].postedTime)
            setRunTime(allSuggestions[0].runTime)
            setTitle(allSuggestions[0].title)
            setWhereToWatch(allSuggestions[0].whereToWatch)
            setWrittenBy(allSuggestions[0].writtenBy)
            setYearOfRelease(allSuggestions[0].yearOfRelease)
            getRatings()
        } else {
            getCurrentSuggestion()
            getRatings()
        }
        setTimeout(() => {
            getRecentPosts()
        }, 4000)

        setTimeout(()=>{
            const cachedAllPosts = JSON.parse(window.sessionStorage.getItem('allPosts'))
            if(cachedAllPosts===null)getAllPosts()
        },6000)

        setTimeout(() => {
            const cachedReviews = JSON.parse(window.sessionStorage.getItem('reviews'))
            if (cachedReviews === null) getReviews()
        }, 6000)

        setTimeout(() => {
            const cachedSuggestions = JSON.parse(window.sessionStorage.getItem('suggestions'))
            if (cachedSuggestions === null) getSuggestions()
        }, 6000)
    }, [])
    return (
        <>
            <MetaDecorator title={title} description={description} imageURL={imageURL}/>
            <Navbar />
            <PostPath title={title} postType="Suggestions" />
            <SuggestionCardComponent
                censorRating={censorRating}
                description={description}
                directedBy={directedBy}
                genre={genre}
                imageURL={imageURL}
                language={language}
                postedTime={postedTime}
                runTime={runTime}
                title={title}
                whereToWatch={whereToWatch}
                writtenBy={writtenBy}
                yearOfRelease={yearOfRelease}
            />
            <RateMovie postID={suggestionID} postType="Suggestions" submitRating={submitRating} currentValue={currentValue} handleClick={handleClick} handleMouseLeave={handleMouseLeave} handleMouseOver={handleMouseOver} hoverValue={hoverValue} />

            <UserRatingLayout postID={suggestionID} postType="Suggestions" uniqueEmail={uniqueEmail} getRatings={getRatings} ratedStars={ratedStars} leftStars={leftStars} />

            <PostYouMightLike recentPosts={recentPosts} postID={suggestionID}/>
            {/* <UserComments postID={suggestionID}/> */}
            <CommentForm postID={suggestionID} />
            <SocialProfiles />
        </>
    )
}

export default DetailedSuggestion