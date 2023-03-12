import React from 'react'
import { FaStar } from 'react-icons/fa';
function UserRatingLayout(props) {

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };

    return (
        <div className="container mt-2 " style={{ display: `${props.postType !== 'Reviews' ? 'none' : ''}` }}>
                <h2 className='bebasneue'>Final User Rating:</h2>

                <div className="container d-flex flex-row">
                    {props.ratedStars ? props.ratedStars.map((_, index) => {
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
                    {props.leftStars ? props.leftStars.map((_, index) => {
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

                    <h5 className=''>({props.ratedStars.length}/5) {props.uniqueEmail} {props.uniqueEmail<=1?"Rating":'Ratings'}</h5>
                </div>
            </div>

    )
}

export default UserRatingLayout