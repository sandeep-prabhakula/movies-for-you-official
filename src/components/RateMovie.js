import React from 'react'
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext";
import { firestore } from '../firebase'
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { Button } from 'react-bootstrap';

function RateMovie(props) {

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
        let ref = doc(commentsDB, `${props.postID}`)
        let currentUser = JSON.parse(window.localStorage.getItem('currentUser'))
        if (user !== null) {
            if (currentValue !== 0) {
                await updateDoc(ref, {
                    ratingsList: arrayUnion({
                        'email': user.email,
                        'rating': currentValue
                    })
                })
                // ratingsList.unshift({
                //     'email': user.email,
                //     'rating': currentValue
                // })
                // let ratingSum = 0
                // for (let i = 0; i < ratingsList.length; i++) {
                //     ratingSum += ratingsList[i].rating;

                // }
                // setCumilativeRating(Math.floor(ratingSum / ratingsList.length))
                setCurrentValue(0)
            }
            else{
                console.log('null rating not accepted')
            }
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="container" style={{ display: `${props.postType !== 'Reviews' ? 'none' : ''}` }}>
            <h2 className='bebasneue me-2'>Rate Your Movie Experience:</h2>
            <div className="container">

                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                        />
                    )
                })}
                <Button className='btn btn-primary' onClick={submitRating} style={{
                    height: '32px'
                }}>
                    <h6>
                        Submit
                    </h6>
                </Button>
            </div>
        </div>
    )
}

export default RateMovie