import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase'
function UserRatingLayout(props) {
    const [ratingsList, setRatingList] = useState([])
    const [ratedStars, setRatedStars] = useState([])
    const [leftStars, setLeftStars] = useState([])
    const [cumilativeRating, setCumilativeRating] = useState(0)
    const [uniqueEmail,setUniqueEmails] = useState(0)

    //get Ratings
    const getRatings = async () => {
        const uniqueUsers = new Set()
        const ref = doc(firestore, 'Comments', `${props.postID}`)
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
        getRatings()
    }, [])

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };

    return (
        <div className="container mt-2 " style={{ display: `${props.postType !== 'Reviews' ? 'none' : ''}` }}>
                <h2 className='bebasneue'>Final User Rating:</h2>

                <div className="container d-flex flex-row">
                    {ratedStars ? ratedStars.map((_, index) => {
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
                    }) : console.log("full rating")}

                    <h5 className=''>({ratedStars.length}/5) {uniqueEmail} {uniqueEmail==1?"Rating":'Ratings'}</h5>
                </div>
            </div>

    )
}

export default UserRatingLayout