import React, { useEffect, useState } from 'react'
import { onSnapshot, query, collection, where } from 'firebase/firestore'
import { firestore } from '../firebase'
import GenreCard from './GenreCard'
import Navbar from './NavBar'
import SocialProfiles from './SocialProfiles'
function SuggestionsGenre() {

    const collectionRef = collection(firestore, "Posts")
    const genres = ["Drama", "Romance", "Comedy", "Thriller", "Horror", "Fantasy", "Adventure", "Mystery", "Crime", "Sci-fi"]
    const [suggestions, setSuggestions] = useState([])
    const getSuggestions = async () => {
        const allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'))
        if (allPosts !== null && allPosts.length !== 0) {
            setSuggestions(allPosts.filter((item) => {
                return item.postType === "Suggestions"
            }))
        } else {
            const q = query(collectionRef, where('postType', "==", "Suggestions"))
            onSnapshot(q, (snapshot) => {
                setSuggestions(snapshot.docs.map(doc => doc.data()).reverse())
            })
        }
    }
    useEffect(() => {
        getSuggestions()
    }, [])
    return (
        <>
            <Navbar />
            <SocialProfiles/>
            <div className='container mt-3'>
                <h1 className='bebasneue'>Genres : </h1>
                <div className="row">
                    {genres.map((genre) => {
                        return <div key={genre} className='col-md-4'>
                            <GenreCard
                                suggestions={suggestions}
                                genre={genre}
                            />
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default SuggestionsGenre