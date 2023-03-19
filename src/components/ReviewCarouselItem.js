import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Carousal.css'

function ReviewCarouselItem(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async()=>{
        navigate(`/reviews/${props.postedTime}`)
    }
  return (
    <div className="card bg-dark text-white" onClick={viewDetailedPost} style={{
        cursor:'pointer'
    }}>
        <img src={props.imageURL} className="card-img img-fluid " alt={props.movieTitle} />
        <div className="card-img-overlay d-flex flex-column justify-content-end mCard">
            <small className="nexa">{props.movieTitle.length>70?props.movieTitle.slice(0,70)+'...':props.movieTitle}</small>
        </div>
    </div>
  )
}

export default ReviewCarouselItem