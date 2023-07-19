import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ReviewItem(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async () => {
        const payload = {state:{
            id:props.id
        }}
        let endPoint = props.title.replaceAll(': ',"-")
            endPoint = endPoint.replaceAll(' ','-')
        navigate(`/posts/${endPoint}`,payload)
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
                }}>{props.title}</p>
            </div>
        </div>
    )
}

export default ReviewItem