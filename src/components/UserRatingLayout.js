import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase'
function UserRatingLayout(props) {
    const [ratingList, setRatingList] = useState([])
    //get Ratings
    const getRatings = async () => {
        const ref = doc(firestore, 'Comments', `${props.postID}`)
        const docSnap = await getDoc(ref)
        const data = docSnap.data()
        setRatingList(data.ratingsList)
        console.log(data.ratingsList)
    }
    useEffect(() => {
        console.log('unmounted')
        getRatings()
    }, [])

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };
    let cumilativeRating = 0;
    for (let i = 0; i < ratingList.length; i++) {
        cumilativeRating += ratingList[i].rating
        console.log(cumilativeRating)
    }
    console.log(ratingList)
    cumilativeRating = Math.floor(cumilativeRating / ratingList.length)
    const ratedStars = Array(cumilativeRating).fill(1)
    const leftStars = Array(5 - cumilativeRating).fill(0)

    return (
        <div className="container">
            <div>
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
            </div>

        </div>

    )
}

export default UserRatingLayout