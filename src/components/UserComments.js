import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { firestore } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

function UserComments(props) {
    const getAllComments = async () => {
        const ref = doc(firestore, 'Comments', `${props.postID}`)
        const docSnap = await getDoc(ref)
        const data = docSnap.data()
        setcommentsListState(data.commentsList)
        // setRatingList(data.ratingsList)

    }
    const [commentsListState, setcommentsListState] = useState([])
    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <div className="container my-2">
            <h3 className='bebasneue'>Comments : </h3>
            {commentsListState ? commentsListState.map((currentComment) => {
                return <div key={currentComment.timestamp}>
                    <Comment
                        name={currentComment.name}
                        comnt={currentComment.comment}
                        commentTimestamp={currentComment.timestamp}
                    />
                </div>
            }) : console.log('no comments')}
        </div>
    )
}

export default UserComments