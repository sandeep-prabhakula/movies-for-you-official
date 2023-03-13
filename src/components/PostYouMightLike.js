import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import ReviewItem from './ReviewItem'
import HorizontalCard from './HorizontalCard'

function PostYouMightLike(props) {
    
    return (
        <div className="container mt-2">
            <h3 className='bebasneue'>Posts You Might Also like: </h3>
            <div className="row d-flex flex-row">
                {props.recentPosts.map((element) => {

                    return <div key={element.postedTime} className="col-md-4">
                        <HorizontalCard title={element.title ? element.title : ""}
                            description={element.description ? element.description : ""}
                            imageURL={element.imageURL ? element.imageURL : "https://i.ytimg.com/vi/z2T9NDVpzXk/hqdefault.jpg"}
                            videoURL={element.videoURL ? element.videoURL : ''}
                            typeOfPost={element.postType}
                            id={element.postedTime}
                            titleOfPoster={element.imageTitle}
                            writtenBy={element.writtenBy}
                            yearOfRelease={element.yearOfRelease} />
                    </div>
                })}
            </div>
        </div>
    )
}

export default PostYouMightLike