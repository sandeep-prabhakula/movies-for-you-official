import { onSnapshot, collection, where, query } from 'firebase/firestore'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebase'
import Navbar from './NavBar'
import SocialProfiles from './SocialProfiles'
import SuggestionItem from './SuggestionItem'
import { Helmet } from 'react-helmet-async'
import Loader from './Loader'
import { useQuery } from '@tanstack/react-query'

function Suggestions(props) {
    const { genre } = useParams()
    const collectionRef = collection(firestore, 'Suggestions')
    const [genreSuggestions, setGenreSuggestions] = useState([])
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
        let posts
        if (allSuggestions !== null && allSuggestions.length !== 0) {
            posts = allSuggestions;
        } else {
            onSnapshot(collectionRef, (snapshot) => {
                posts = snapshot.docs.map(doc => doc.data()).reverse()
                window.sessionStorage.setItem(allSuggestions, JSON.stringify(snapshot.docs.map(doc => doc.data()).reverse()))
            })
        }
        return posts
    }

    const { isLoading, isError, data, error } = useQuery(
        ['getSuggestions'],
        getSuggestions,
        {staleTime:120000}
        )

    if(isLoading)return <Loader/>
    if(isError)return <div className='alert alert-danger'>{error}</div>
    return (
        <>
            <Helmet>
                <title>Suggestions</title>
            </Helmet>
            <Navbar />
            <SocialProfiles />
            <div className="container mt-2">
                <div className="row">
                    {data.map((suggestion) => {
                        return <div key={suggestion.postedTime} className="col-md-4">
                            <SuggestionItem id={suggestion.postedTime}
                                imageURL={suggestion.imageURL}
                                title={suggestion.title} />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Suggestions