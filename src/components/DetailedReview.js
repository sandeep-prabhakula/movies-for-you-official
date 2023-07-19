import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase';
import CommentForm from './CommentForm';
import Navbar from './NavBar'
import PostPath from './PostPath'
import ReviewCardComponent from './ReviewCardComponent';
import SocialProfiles from './SocialProfiles';
import UserRatingLayout from './UserRatingLayout';
import { doc, getDoc, collection, onSnapshot, updateDoc, arrayUnion, query, orderBy, limit } from 'firebase/firestore'
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from 'react-router-dom';
import PostYouMightLike from './PostYouMightLike';
import RateMovie from './RateMovie';
import UserComments from './UserComments';
import AdContent from './AdContent';
import MetaDecorator from './MetaDecorator';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

function DetailedReview() {
    const location = useLocation();
    
    const reviewID  = location.state.id;
    // getCurrentReview
    const [actorPerformances, setActorPerformances] = useState('')
    const [directedBy, setDirectedBy] = useState('')
    const [finalVerdict, setFinalVerdict] = useState('')
    const [genre, setGenre] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [intro, setIntro] = useState('')
    const [movieTitle, setMovieTitle] = useState('')
    const [negatives, setNegatives] = useState('')
    const [originLanguage, setOriginLanguage] = useState('')
    const [positives, setPositives] = useState('')
    const [postedTime, setPostedTime] = useState(0)
    const [releaseDate, setReleaseDate] = useState('')
    const [runTimeLength, setRunTimeLength] = useState('')
    const [starring, setStarring] = useState('')
    const [storyLine, setStoryLine] = useState('')
    const [writtenBy, setWrittenBy] = useState('')

    const getCurrentReview = async () => {
        const docRef = doc(firestore, "Reviews", `${reviewID}`)
        const docSnap = await getDoc(docRef)
        const currentPost = docSnap.data()
        setActorPerformances(currentPost.actorPerformances)
        setDirectedBy(currentPost.directedBy)
        setFinalVerdict(currentPost.finalVerdict)
        setGenre(currentPost.genre)
        setImageURL(currentPost.imageURL)
        setIntro(currentPost.intro)
        setMovieTitle(currentPost.title)
        setNegatives(currentPost.negatives)
        setOriginLanguage(currentPost.originLanguage)
        setPositives(currentPost.positives)
        setPostedTime(currentPost.postedTime)
        setReleaseDate(currentPost.releaseDate)
        setRunTimeLength(currentPost.runTimeLength)
        setStarring(currentPost.starring)
        setStoryLine(currentPost.storyLine)
        setWrittenBy(currentPost.writtenBy)
    }

    // get recent posts
    const [recentPosts, setRecentPosts] = useState([])

    const getRecentPosts = () => {
        // caching

        let cachedRecentPosts = JSON.parse(window.sessionStorage.getItem('recentPosts'));
        if (cachedRecentPosts !== null && cachedRecentPosts.length !== 0) {
            // console.log(cachedRecentPosts)
            let tempRecentPosts = []
            if (cachedRecentPosts.length <= 5) {
                setRecentPosts(cachedRecentPosts.filter((item) => {
                    return item.postedTime !== reviewID
                }))
            }
            else {
                for (let i = 0; i < cachedRecentPosts.length; i++) {
                    if (reviewID !== cachedRecentPosts[i].postedTime) tempRecentPosts.push(cachedRecentPosts[i]);
                }

                setRecentPosts(tempRecentPosts)
            }
        } else {
            const docRef = collection(firestore, 'Posts')
            const reviewRef = collection(firestore, 'Reviews')
            const suggestionRef = collection(firestore, 'Suggestions')
            let data = []
            const q = query(docRef, orderBy('postedTime', 'desc'), limit(5))
            onSnapshot(q, (snapshot) => {
                data = snapshot.docs.map(doc => doc.data()).filter((doc) => {
                    return doc.postedTime !== reviewID
                })
                window.sessionStorage.setItem('recentPosts', JSON.stringify(data))
            })
            const reviewQ = query(reviewRef, orderBy('postedTime', 'desc'), limit(2))
            onSnapshot(reviewQ, (snapshot) => {
                data = data.concat(snapshot.docs.map(doc => doc.data()).filter((item) => {
                    return doc.postedTime !== reviewID
                }))
                window.sessionStorage.setItem('recentPosts', JSON.stringify(data))
            })
            const suggestionQ = query(suggestionRef, orderBy('postedTime', 'desc'), limit(2))
            onSnapshot(suggestionQ, (snapshot) => {
                data = data.concat(snapshot.docs.map(doc => doc.data()).filter((item) => {
                    return item.postedTime !== reviewID
                }))
                window.sessionStorage.setItem('recentPosts', JSON.stringify(data))
            })
            data = data.sort((a, b) => {
                return a.postedTime - b.postedTime
            })
            window.sessionStorage.setItem('recentPosts', JSON.stringify(data))
            data = JSON.parse(window.sessionStorage.getItem('recentPosts'))
            setRecentPosts(data)
            // console.log(recentPosts)
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
        let ref = doc(commentsDB, `${reviewID}`)
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
        const ref = doc(firestore, 'Comments', `${reviewID}`)
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
        const analytics = getAnalytics();
        logEvent(analytics,movieTitle)
        window.scrollTo(0, 0)
        setRatedStars([])
        setLeftStars([])

        let allReviews = JSON.parse(window.sessionStorage.getItem('reviews'))
        if (allReviews !== null && allReviews !== 0) {
            allReviews = allReviews.filter((item) => {
                return item.postedTime === reviewID
            })
            setActorPerformances(allReviews[0].actorPerformances)
            setDirectedBy(allReviews[0].directedBy)
            setFinalVerdict(allReviews[0].finalVerdict)
            setGenre(allReviews[0].genre)
            setImageURL(allReviews[0].imageURL)
            setIntro(allReviews[0].intro)
            setMovieTitle(allReviews[0].title)
            setNegatives(allReviews[0].negatives)
            setOriginLanguage(allReviews[0].originLanguage)
            setPositives(allReviews[0].positives)
            setPostedTime(allReviews[0].postedTime)
            setReleaseDate(allReviews[0].releaseDate)
            setRunTimeLength(allReviews[0].runTimeLength)
            setStarring(allReviews[0].starring)
            setStoryLine(allReviews[0].storyLine)
            setWrittenBy(allReviews[0].writtenBy)
            getRatings()
            getRecentPosts()
        } {
            getCurrentReview()
            getRatings()
            setTimeout(() => {
                getRecentPosts()
            }, 4000)
        }



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
    }, [reviewID])


    return (
        <>
            <Navbar />
            <MetaDecorator title={movieTitle} description={intro} imageURL={imageURL}/>
            <PostPath title={movieTitle} postType="Reviews" />
            <AdContent/>
            <ReviewCardComponent
                actorPerformances={actorPerformances}
                directedBy={directedBy}
                finalVerdict={finalVerdict}
                genre={genre}
                imageURL={imageURL}
                intro={intro}
                movieTitle={movieTitle}
                negatives={negatives}
                originLanguage={originLanguage}
                positives={positives}
                postedTime={postedTime}
                releaseDate={releaseDate}
                runTimeLength={runTimeLength}
                starring={starring}
                storyLine={storyLine}
                writtenBy={writtenBy}

            />
            <RateMovie postID={reviewID} postType="Reviews" submitRating={submitRating} currentValue={currentValue} handleClick={handleClick} handleMouseLeave={handleMouseLeave} handleMouseOver={handleMouseOver} hoverValue={hoverValue} />

            <UserRatingLayout postID={reviewID} postType="Reviews" uniqueEmail={uniqueEmail} getRatings={getRatings} ratedStars={ratedStars} leftStars={leftStars} />
            {recentPosts.length===0?<Loader/>:<PostYouMightLike recentPosts={recentPosts} postID={reviewID} />}
            {/* <UserComments postID={reviewID}/> */}
            <CommentForm postID={reviewID} />
            <SocialProfiles />
        </>
    )
}

export default DetailedReview