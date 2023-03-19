import React from 'react'
import './ReviewCardComponent.css'
function ReviewCardComponent(props) {
    return (
        <div className='container d-flex flex-column justify-content-center'>
            <h1 className='bebasneue'>{props.movieTitle} Review</h1>
            <div className='container d-flex flex-column justify-content-between align-items-end'>
                <small className='cobertCondesnedItalic'>
                    {props.writtenBy} - {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join('-')}
                </small>
            </div>
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                <img src={props.imageURL} alt={props.movieTitle} className='img-fluid mBanner' />
            </div>
            <div className="starring">
                {props.starring}
            </div>
            <div className="movieDetails">
                {props.genre}
                {props.directedBy}
                {props.releaseDate}
                {props.runTimeLength}
                {props.originLanguage}
            </div>
            <div className="intro">
                {props.intro.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="actorPerformances">
                {props.actorPerformances.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="storyLine">
                {props.storyLine.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="positives">
                {props.positives.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="negatives">
                {props.negatives.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="finalVerdict">
                {props.finalVerdict}
            </div>
        </div>
    )
}

export default ReviewCardComponent