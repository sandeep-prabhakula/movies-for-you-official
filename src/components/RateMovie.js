import React from 'react'
import { FaStar } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

function RateMovie(props) {

    const colors = {
        orange: "#FFBA5A",
        grey: "#a9a9a9"

    };
    const stars = Array(5).fill(0)

    return (
        <div className="container mt-3">
            <h2 className='bebasneue me-2'>Rate Your Movie Experience:</h2>
            <div className="container">

                {stars.map((_, index) => {
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            onClick={() => props.handleClick(index + 1)}
                            onMouseOver={() => props.handleMouseOver(index + 1)}
                            onMouseLeave={props.handleMouseLeave}
                            color={(props.hoverValue || props.currentValue) > index ? colors.orange : colors.grey}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                        />
                    )
                })}
                <Button className='btn btn-primary' onClick={props.submitRating} style={{
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