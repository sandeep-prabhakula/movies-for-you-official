import React from 'react'
import { Link } from 'react-router-dom'
function MinireviewItem(props) {
  return (
    <Link to={`/posts/${props.id}`} style={{textDecoration:'none',color:'#000000'}} >
            <div className="card mb-2 border border-dark border-2 ">
                <img src={props.imageURL} className="card-img-sm-left d-flex img-fluid" alt="..." />
                <div className="card-body">
                    <p className="lemonMilk card-text" style={{lineHeight:'20px'}}>{props.title}</p>
                </div>
            </div>
        </Link>
  )
}

export default MinireviewItem