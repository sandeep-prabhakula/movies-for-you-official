import React from 'react'
import { useNavigate } from 'react-router-dom'

function ReviewCardItem(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async () => {
        const endPoint = props.title.replaceAll(' ','-')
        console.log('The current end point is ',endPoint)
        navigate(`/reviews/${endPoint}`,{state:{
            id:props.id
        }})
    }
    return (

        <div className="card mb-2 border border-dark border-1 d-flex" onClick={viewDetailedPost} style={{
            cursor: 'pointer',
        }}>
            <img src={props.imageURL} className="card-img-top img-fluid" alt="..." />
            <div className="card-body">
                <p className="lemonMilk card-text" style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                }}>{props.title} </p>
            </div>
        </div>

    )
}

export default ReviewCardItem