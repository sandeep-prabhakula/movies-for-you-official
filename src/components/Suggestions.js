import { onSnapshot, collection, where, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebase'
import Navbar from './NavBar'
import SocialProfiles from './SocialProfiles'
import SuggestionItem from './SuggestionItem'
import { Helmet } from 'react-helmet-async'
import Loader from './Loader'

function Suggestions(props) {
    const { genre } = useParams()
    const collectionRef = collection(firestore, 'Suggestions')
    const [genreSuggestions, setGenreSuggestions] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const allSuggestions = JSON.parse(window.sessionStorage.getItem('suggestions'))
    const cacheSuggestions = JSON.parse(window.sessionStorage.getItem(genre))

    const getGenreSuggestions = async () => {
        if (cacheSuggestions !== null && cacheSuggestions.length !== 0) {
            setGenreSuggestions(cacheSuggestions)
        } else {
            onSnapshot(collectionRef, (snapshot) => {
                setGenreSuggestions(snapshot.docs.map(doc => doc.data()).filter((item) => {

                    return item.genre.toLowerCase().includes(genre)
                }).reverse())
                window.sessionStorage.setItem(genre, JSON.stringify(snapshot.docs.map(doc => doc.data()).filter((item) => {
                    return item.genre.toLowerCase().includes(genre)
                })))
            })
        }
    }
    const getSuggestions = async () => {
        if (allSuggestions !== null && allSuggestions.length !== 0) {
            setSuggestions(allSuggestions)
        } else {
            onSnapshot(collectionRef, (snapshot) => {
                setSuggestions(snapshot.docs.map(doc => doc.data()).reverse())
                window.sessionStorage.setItem(allSuggestions, JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
            })
        }
    }
    useEffect(() => {

        // currently the below method is disabled
        // getGenreSuggestions()
        getSuggestions()

    }, [])
    if(suggestions.length===0)return <Loader/>
    return (
        <>
            <Helmet>
                <title>Suggestions</title>
            </Helmet>
            <Navbar />
            <SocialProfiles />
            <div className="container mt-2">
                <div className="row">
                    {suggestions ? suggestions.map((suggestion) => {
                        return <div key={suggestion.postedTime} className="col-md-4">
                            <SuggestionItem id={suggestion.postedTime}
                                imageURL={suggestion.imageURL}
                                title={suggestion.title} />
                        </div>
                    }) : console.log("...")}
                </div>
            </div>
        </>
    )
}

export default Suggestions