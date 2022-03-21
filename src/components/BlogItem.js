import React, { useState } from 'react'
import AuthContext from '../context/auth/AuthContext';
import { useContext, useEffect } from 'react';

function BlogItem(props) {
    const context = useContext(AuthContext)
    const [likes, setLikes] = useState(0)
    const { user, admin, deletePost, updateLikes, likeCount } = context
    const handleDelete = () => {
        deletePost(props.postTitle)
    }
    const handleLike = () => {
        updateLikes(props.postTitle)
        handleLikeCount()
    }
    const handleLikeCount = async () => {
        setLikes(await likeCount(props.postTitle))
    }
    useEffect(() => {
        handleLikeCount()
    }, [])
    return (
        <div className="container my-3">
            <div className="container-xl d-flex flex-column" style={{
                border: '2px solid black',
                borderRadius: '25px'
            }}>
                <h1>{props.postTitle}</h1>
                <h6>
                    posted on {props.postDate}</h6>
                <p>{props.postDescription}</p>
                <div className="container justify-content-center">
                    <div className="container d-flex justify-content-around">
                        <button className='btn btn-outline-primary mx-2 my-2' style={{
                            display: user !== null ? 'inline' : 'none',
                        }} onClick={handleLike}>Like</button>
                        <button className='btn btn-outline-primary mx-2 my-2' style={{
                            display: user !== null ? 'inline' : 'none',
                        }}>Comment</button>
                        <button className='btn btn-outline-primary mx-2 my-2' style={{
                            display: user !== null ? 'inline' : 'none',
                        }}>Share</button>
                    </div>
                    <div className="container d-flex justify-content-around">
                        <button className='btn btn-outline-primary mx-2 my-2' style={{
                            display: user !== null && admin !== null ? 'inline' : 'none',
                        }}>Edit</button>
                        <button className='btn btn-outline-primary mx-2 my-2' style={{
                            display: user !== null && admin !== null ? 'inline' : 'none',
                        }} onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <div className="container d-flex justify-content-around">
                    <p>{likes} Likes</p>
                    <p>0 comments</p>
                </div>
            </div>
        </div>
    )
}

export default BlogItem