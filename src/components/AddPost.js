import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'
import { Form } from "react-bootstrap";
import { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebase'
import { firestore } from '../firebase'
import { collection, doc, setDoc } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'

function AddPost() {
    const postsDB = collection(firestore,'Posts')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [videoURL, setvideoURL] = useState('')
    const [imageData, setImageData] = useState(null)
    const [imageURL, setImageURL] = useState('')
    const [postType, setPostType] = useState('Review')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        const imageRef = ref(storage, `posts/${timestamp}`)
        uploadBytes(imageRef, imageData).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {

                setImageURL(url)


                const formData = {
                    'postedTime': timestamp,
                    'title': title,
                    'description': description,
                    'postType': postType,
                    'imageURL': url,
                    'videoURL': videoURL,
                }
                if (title !== '' && description !== '' && postType !== '' && imageURL !== null && timestamp != null) {
                    setDoc(doc(postsDB, `${timestamp}`), formData).then(() => {
                        setTitle('')
                        setDescription('')
                        setImageData(null)
                        setImageURL('')
                        setvideoURL('')
                        setPostType('')
                        navigate('/home')
                    }).catch((err) => {
                        setError(err)
                    })

                } else {
                    setError('empty credentials not accepted')
                }
            })
        })
    }
    return (
        <>
            <NavBar></NavBar>
            <h1 className='text-center' style={{
                marginTop: '75px'
            }}>Add new Post</h1>
            <div className="p-4 d-flex w-100 h-100 justify-content-center align-items-center align-content-center flex-column">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Movie title"
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="text"
                            required
                            placeholder="Movie description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="text"
                            placeholder="Relevant urls use comma to seperate urls"
                            onChange={(e) => setvideoURL(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="file"
                            required
                            accept='image/*'
                            placeholder="Movie description"
                            onChange={(e) => setImageData(e.target.files[0])}
                        />
                    </Form.Group>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Reviews" checked={postType === 'Reviews'} onChange={(e) => {
                            setPostType(e.target.value)
                        }} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Review
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Suggestions" checked={postType === 'Suggestions'} onChange={(e) => {
                            setPostType(e.target.value)
                        }} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Suggestion
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Box Office Collections" checked={postType === 'Box Office Collections'} onChange={(e) => {
                            setPostType(e.target.value)
                        }} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Box Office Collections
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Exclusive Updates" checked={postType === 'Exclusive News'} onChange={(e) => {
                            setPostType(e.target.value)
                        }} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Exclusive Updates
                        </label>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Upload Post
                        </Button>
                    </div>
                </Form>
            </div>
            <Footer></Footer>
        </>
    )
}

export default AddPost