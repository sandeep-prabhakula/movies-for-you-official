import React from 'react'
import { Link } from 'react-router-dom'
import DetailedPost from './DetailedPost'

function ReviewItem(props) {
    return (
        <Link to={`/posts/${props.id}`} style={{textDecoration:'none',color:'#000000'}} >
            <div className="card">
                <img src={props.imageURL} className="card-img-top d-block w-100 img-fluid" alt="..." />
                <div className="card-body">
                    <p className="lemonMilk">{props.title}</p>
                </div>
            </div>
        </Link>
    )
}

export default ReviewItem