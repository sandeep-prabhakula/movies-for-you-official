import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ReviewItem(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async()=>{
        navigate(`/posts/${props.id}`)
    }
    return (
            <div className="card mb-2 border border-dark border-2 d-flex" onClick={viewDetailedPost} style={{cursor:'pointer'}}>
                <img src={props.imageURL} className="card-img-top img-fluid" alt="..." />
                <div className="card-body">
                    <p className="lemonMilk card-text" style={{lineHeight:'20px'}}>{props.title}</p>
                </div>
            </div>
    )
}

export default ReviewItem