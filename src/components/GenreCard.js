import React from 'react'
import { useNavigate } from 'react-router-dom'

function GenreCard(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async()=>{
        navigate(`/suggestions/${props.genre.toLowerCase()}`)
    }
    return (
        <div className="container mt-2 mb-1" onClick={viewDetailedPost}>
            <div className="card d-flex border border-dark border-1 justify-content-center align-items-center" style={{
                cursor:'pointer'
            }}>
                <h5 className='card-title lemonMilk'>{props.genre}</h5>
            </div>
        </div>
    )
}

export default GenreCard