import React from 'react'
import Comment from './Comment'
function UserComments(props) {
  return (
    <div className="container my-2">
                <h3 className='bebasneue'>Comments : </h3>
                {props.commentsListState ? props.commentsListState.map((currentComment) => {
                    return <div key={currentComment.timestamp}>
                        <Comment
                            name={currentComment.name}
                            comnt={currentComment.comment}
                            commentTimestamp={currentComment.timestamp}
                        />
                    </div>
                }):console.log('no comments')}
            </div>
  )
}

export default UserComments