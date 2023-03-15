import React from 'react'
import Carousal from './Carousal'

function PostYouMightLike(props) {

    return (
        <div className="container mt-3">
            <h3 className='bebasneue'>Posts You Might like: </h3>
            <Carousal slides={props.recentPosts} />
        </div>
    )
}

export default PostYouMightLike