import { onSnapshot, collection, where,query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { firestore } from '../firebase'
import Navbar from './NavBar'

function Suggestions(props) {
    const { genre } = useParams()
    const collectionRef = collection(firestore,'Suggestions')
    const [genreSuggestions, setGenreSuggestions] = useState([])
    const cacheSuggestions = JSON.parse(window.sessionStorage.getItem('suggestions'))
    const getGenreSuggestions = async () => {
        if (cacheSuggestions !== null && cacheSuggestions.length !== 0) {
            setGenreSuggestions(props.suggestions.filter((item) => {
                return item.genre.toLowerCase().includes(genre)
            }))
        } else {
            onSnapshot(collectionRef,(snapshot)=>{
                setGenreSuggestions(snapshot.docs.filter((item)=>{
                    return item.genre.toLowerCase().includes(genre)
                }))
            })  
        }
    }
    useEffect(() => {
        getGenreSuggestions()
    }, [])
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    {genreSuggestions?genreSuggestions.map((suggestion)=>{
                        console.log(genreSuggestions)
                        return <div key={suggestion.postedTime}>
                            <div className="container">
                                <h3>{suggestion.title}</h3>
                            </div>
                        </div>
                    }):console.log("...")}
                </div>
            </div>
        </>
    )
}

export default Suggestions