import React from 'react'

function ReviewItem(props) {
    return (
        <>
            <div className='my-3'>
            <div className="card" style={{
                backgroundColor: props.mode === 'light' ? '#fff' : '#FFD700',
                color: props.mode === 'dark' ? '#fff' : '#000'
            }}>
                <span className="d-flex justify-content-end position-absolute top-0 translate-middle badge round-pill bg-dark right-0" style={{
                    left: '80%', zIndex: '1'
                }}>
                    {props.typeOfPost}
                </span>
                <h5 className="card-title">{props.title}</h5>
                <img src={props.imageURL} className="img-thumbnail" alt={props.title} style={{height:'300px'}} />
                <div className="card-body">
                    
                    <p className="card-text">{props.description}...</p>
                    <a href={props.videoURL} className="btn btn-sm btn-primary" target="_blank" rel="noopener noreferrer">Watch review</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default ReviewItem