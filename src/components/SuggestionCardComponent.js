import React from 'react'

function SuggestionCardComponent(props) {
    return (
        <div className='container d-flex flex-column justify-content-center'>
            <h1 className='bebaseneue'>{props.title}</h1>
            <div className='container d-flex flex-column justify-content-between align-items-end'>
                <small className='cobertCondesnedItalic'>
                    {props.writtenBy} - {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join('-')}
                </small>
            </div>
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                <img src={props.imageURL} alt={props.title} className='img-fluid mBanner' />
            </div>
            <div className="movieDetails">
                {props.directedBy}
                {props.runTime}
                {props.language}
                {props.genre}
                {props.whereToWatch}
                {props.censorRating}
            </div>
            <div className="description">
                {props.description.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
        </div>
    )
}

export default SuggestionCardComponent