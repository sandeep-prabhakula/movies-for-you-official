import React from 'react'
import './ReviewCardComponent.css'
import AdContent from './AdContent'

function ReviewCardComponent(props) {

    return (
        <>


            <div className=' d-flex flex-column justify-content-center'>
                <div className='container d-flex flex-column justify-content-between'>
                    <h1 className=''>
                        <strong>
                            {props.movieTitle}
                        </strong>
                    </h1>
                    <small className=''>
                        {props.writtenBy} | {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join(' ')} IST
                    </small>
                </div>
                <hr />
                <div className='container d-flex flex-column justify-content-center align-items-center'>
                    <img src={props.imageURL} alt={props.movieTitle} className='img-fluid mBanner' />
                </div>
                <div className="container movieDetails mt-3">
                    <h4>Movie Details : </h4>
                    <div className=" starring mt-3 ">

                        <strong className='me-2'>
                            Starring <span>:</span>
                        </strong>

                        {props.starring}



                    </div>
                    <div className=" genre">
                        <strong className='me-2'>
                            Genre :
                        </strong>
                        {props.genre}
                    </div>
                    <div className=" directedBy">
                        <strong className='me-2'>
                            Director :
                        </strong>
                        {props.directedBy}
                    </div>
                    <div className=" releaseDate">
                        <strong className='me-2'>Release Date:</strong>
                        {props.releaseDate}
                    </div>
                    <div className=" runTimeLength">
                        <strong className='me-2'>
                            Run Time :
                        </strong>
                        {props.runTimeLength}
                    </div>
                    <div className=" originLanguage">
                        <strong className='me-2'>
                            Original Language :
                        </strong>
                        {props.originLanguage}
                    </div>
                </div>
                <AdContent />
                <div className="container intro mt-3">
                    <h4 className=''>
                        <strong>
                            Intro :
                        </strong>
                    </h4>
                    {props.intro.split('\\n').map((paragraph) => {
                        return <p className='openSans mt-3'>{paragraph}</p>
                    })}

                </div>

                <div className="container storyLine">
                    <h4 className=''>
                        <strong>
                            Story Line :
                        </strong>
                    </h4>
                    {props.storyLine.split('\\n').map((paragraph) => {
                        return <p className='openSans mt-3'>{paragraph}</p>
                    })}
                </div>
                <AdContent />
                <div className="container actorPerformances">
                    <h4 className=''>
                        <strong>
                            Actors Performance :
                        </strong>
                    </h4>
                    {props.actorPerformances.split('\\n').map((paragraph) => {
                        return <p className='openSans mt-3'>{paragraph}</p>
                    })}
                </div>
                <div className="container positives">
                    <h4 className=''>
                        <strong>
                            Positives :
                        </strong>
                    </h4>
                    {props.positives.split('\\n').map((paragraph) => {
                        return <p className='openSans mt-3'>{paragraph}</p>
                    })}
                </div>
                <div className="container negatives">
                    <h4 className=''>
                        <strong>
                            Negatives :
                        </strong>
                    </h4>
                    {props.negatives.split('\\n').map((paragraph) => {
                        return <p className='openSans mt-3'>{paragraph}</p>
                    })}
                </div>
                <div className="container finalVerdict">
                    <h4 className=''>
                        <strong>

                            Final Verdict :
                        </strong>
                    </h4>
                    {props.finalVerdict}
                </div>
            </div>
        </>

    )
}

export default ReviewCardComponent