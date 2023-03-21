import React from 'react'
import './ReviewCardComponent.css'
function ReviewCardComponent(props) {
    return (
        <div className='container d-flex flex-column justify-content-center'>
            <h1 className='bebasneue'>{props.movieTitle} Review</h1>
            <div className='container d-flex flex-column justify-content-between'>
                <small className='arialCeb'>
                    {props.writtenBy} | {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join(',')} IST
                </small>
            </div>
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                <img src={props.imageURL} alt={props.movieTitle} className='img-fluid mBanner' />
            </div>
            <div className="starring mt-3 ms-2">
                <strong className='me-2'>
                    Starring :
                </strong>
                {props.starring}

            </div>
            <div className="movieDetails mt-2 ms-2">
                <div className="genre">
                    <strong className='me-2'>
                        Genre :
                    </strong>
                    {props.genre}
                </div>
                <div className="directedBy">
                    <strong className='me-2'>
                        Directed By :
                    </strong>
                    {props.directedBy}
                </div>
                <div className="releaseDate">
                    <strong className='me-2'>Release Date:</strong>
                    {props.releaseDate}
                </div>
                <div className="runTimeLength">
                    <strong className='me-2'>
                        Run Time :
                    </strong>
                    {props.runTimeLength}
                </div>
                <div className="originLanguage">
                    <strong className='me-2'>
                        Origin Language :
                    </strong>
                    {props.originLanguage}
                </div>
            </div>
            <div className="intro mt-3">
                <h6 className='bebasneue'>Intro : </h6>
                {props.intro.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="actorPerformances">
                <h6 className='bebasneue'>Actor Performances :</h6>
                {props.actorPerformances.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="storyLine">
                <h6 className='bebasneue'>Story Line :</h6>
                {props.storyLine.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="positives">
                <h6 className='bebasneue'>Positives :</h6>
                {props.positives.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="negatives">
                <h6 className='bebasneue'>
                    Negatives :
                </h6>
                {props.negatives.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>
            <div className="finalVerdict">
                <h6 className='bebasneue'>
                    Final Verdict :
                </h6>
                {props.finalVerdict}
            </div>
        </div>
    )
}

export default ReviewCardComponent