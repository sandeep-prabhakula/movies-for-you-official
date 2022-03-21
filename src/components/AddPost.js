import React from 'react'
import AuthContext from '../context/auth/AuthContext';
import { useContext } from 'react';
import { useRef } from 'react';
function UploadBlog() {
    const context = useContext(AuthContext)
    const { addPost } = context
    const movieTitle = useRef()
    const description = useRef()
    const handleAddpost = async()=>{
        let date = new Date()
        addPost(movieTitle.current.value,description.current.value,date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear())
        movieTitle.current.value = ""
        description.current.value = ""
    }
    return (
        <div className='container my-3'>
            <div className="mb-3"style={{
            marginTop:'70px'
        }}>
                <label htmlFor="exampleFormControlInput1" className="form-label"></label>
                <input ref={movieTitle} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Movie Title"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                <textarea ref={description} className="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
            </div>
            <button className='btn btn-primary' onClick={handleAddpost}>Add Post</button>
        </div>
    )
}

export default UploadBlog