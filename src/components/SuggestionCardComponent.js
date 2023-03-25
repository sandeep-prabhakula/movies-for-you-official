import React from 'react'

function SuggestionCardComponent(props) {
    return (
        <div className='d-flex flex-column justify-content-center'>
            <div className='container d-flex flex-column justify-content-between'>
            <h1 className=''>
                <strong>
                    {props.title}
                </strong>
            </h1>
                <small className=''>
                    {props.writtenBy} | {new Date(props.postedTime).toString().slice(4, 21).split(/[ ,]+/).join(' ')} IST
                </small>
            </div>
            <hr />
            <div className='container d-flex flex-column justify-content-center align-items-center'>
                <img src={props.imageURL} alt={props.title} className='img-fluid mBanner' />
            </div>

            <div className="container description mt-3">
                <h2 className='bebasneue'>Description : </h2>
                {props.description.split('\\n').map((paragraph) => {
                    return <p className='openSans mt-3'>{paragraph}</p>
                })}
            </div>

            <div className="container movieDetails d-flex flex-column mt-2 mb-3">
                <h2 className='bebasneue'>Movie Details : </h2>
                <div className="container">

                    <div className="directedBy">
                        <strong className='me-2'>
                            Director :
                        </strong>
                        {props.directedBy}
                    </div>
                    <div className="runtime">
                        <strong className='me-2'> Run Time : </strong>
                        {props.runTime}
                    </div>
                    <div className="language">
                        <strong className='me-2'>
                            Language :
                        </strong>
                        {props.language}
                    </div>
                    <div className="genre">
                        <strong className='me-2'>
                            Genre :
                        </strong>
                        {props.genre}
                    </div>
                    <div className="whereToWatch">
                        <strong className='me-2'>
                            Available on :
                        </strong>
                        {props.whereToWatch}
                    </div>
                    <div className="censorRating">
                        <strong className='me-2'>
                            Censor Rating :
                        </strong>
                        {props.censorRating}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionCardComponent