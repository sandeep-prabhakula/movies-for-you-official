import React from 'react'
import { useUserAuth } from "../context/UserAuthContext";
import { Form, Button } from 'react-bootstrap';
import { firestore } from '../firebase'
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react';

function CommentForm(props) {

    const { user } = useUserAuth()

    const [comment, SetComment] = useState('')
    const [commentorName, setCommentorName] = useState('');

    const commentsDB = collection(firestore, 'Comments')

    const onSubmitComment = async (e) => {
        e.preventDefault()
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        let ref = doc(commentsDB, `${props.postID}`)
        if (comment !== '' && commentorName !== '') {
            await updateDoc(ref, {
                commentsList: arrayUnion({
                    'timestamp': timestamp,
                    'name': user !== null?user.email:commentorName,
                    'comment': comment
                })
            })
            setCommentorName('')
            SetComment('')
        } else {
            console.log("empty Credentials")
        }
    }

    const handleComment = (e) => {
        SetComment(e.target.value)
    }
    const handleCommentorName = (e) => {
        setCommentorName(e.target.value)
    }

    return (
        <div className="container mt-2">
            <h3 className='bebasneue'>Add Comment : </h3>
            <div className="container">
                <Form onSubmit={onSubmitComment}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address : </label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" value={commentorName} placeholder="name@example.com" onChange={handleCommentorName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment : </label>
                        <textarea value={comment} className="form-control" id="exampleFormControlTextarea1" rows="2" onChange={handleComment}></textarea>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Upload Comment
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default CommentForm