import React from 'react'

function CardComponent(props) {
    return (
        <div className="container d-flex flex-column justify-content-center">
            <h1 className="bebasneue">{props.title}</h1>
            <div className='container d-flex flex-column justify-content-between align-items-end'>

                <small className='cobertCondesnedItalic'>
                    {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join('-')} - {props.writtenBy}
                </small>
            </div>
            <img src={props.imageURL} alt={props.title} className='img-fluid' />
            <div className='container d-flex flex-column justify-content-center align-items-center'>

                <small className='cobertCondesnedItalic mt-2' style={{ fontSize: '10px' }}>{props.imageTitle}</small>
            </div>
            <p className='openSans mt-3'>

                {props.description}
            </p>
        </div>
    )
}

export default CardComponent