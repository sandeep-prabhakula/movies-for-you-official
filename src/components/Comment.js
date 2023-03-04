import React from 'react'

function Comment(props) {
    return (
        <>
            <div className="card mx-auto">
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.comnt}</p>
                </div>
            </div>
        </>
    )
}

export default Comment