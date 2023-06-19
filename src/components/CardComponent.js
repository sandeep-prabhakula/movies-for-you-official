import React from 'react'
import './CardComponent.css'
import AdContent from './AdContent'
function CardComponent(props) {
    return (
        <div className=" d-flex flex-column justify-content-center">
            <div className='container d-flex flex-column justify-content-between'>
            <h1 className="cedora">{props.title}</h1>

                <small className=''>
                {props.writtenBy} | {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join(' ')} IST
                </small>
            </div>
            <hr />
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                <img src={props.imageURL} alt={props.title} className='img-fluid mBanner' />

            </div>
            <AdContent/>
            <div className='container description'>
                {props.description.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
        </div>
    )
}

export default CardComponent