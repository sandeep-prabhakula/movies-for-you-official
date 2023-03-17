import React from 'react'
import './CardComponent.css'
function CardComponent(props) {
    return (
        <div className="container d-flex flex-column justify-content-center">
            <h1 className="bebasneue">{props.title}</h1>
            <div className='container d-flex flex-column justify-content-between align-items-end'>

                <small className='cobertCondesnedItalic'>
                    {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join('-')} - {props.writtenBy}
                </small>
            </div>
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                <img src={props.imageURL} alt={props.title} className='img-fluid mBanner' />
                <p className='cobertCondesnedItalic mt-2'>{props.imageTitle}</p>

            </div>
            <div className='description'>
                {props.description.split('\\n').map((paragraph) => {
                    console.log(paragraph)
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
        </div>
    )
}

export default CardComponent