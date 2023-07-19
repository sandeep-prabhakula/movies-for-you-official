import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Carousal.css'

function CarouselItem(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async()=>{
        const payload = {state:{
            id:props.postedTime
        }}
        const endPoint = props.title.replaceAll(' ','-')
        if(props.postType!=='null'){
            let endPoint = props.title.replaceAll(': ',"-")
            endPoint = endPoint.replaceAll(' ','-')
            navigate(`/posts/${endPoint}`,payload)
        }
        if(props.censorRating!=='null'){
            navigate(`/suggestion/${endPoint}`,payload)
        }
        if(props.intro!=='null'){
            
            navigate(`/reviews/${endPoint}`,payload)
        }
    }
    return (
        <div className="card bg-dark text-white" onClick={viewDetailedPost} style={{
            cursor:'pointer'
        }}>
            <img src={props.imageURL} className="card-img img-fluid " alt={props.title} />
            <div className="card-img-overlay d-flex flex-column justify-content-end mCard">
                <small className="nexa">{props.title.length>70?props.title.slice(0,70)+'...':props.title}</small>
            </div>
        </div>
    )
}

export default CarouselItem