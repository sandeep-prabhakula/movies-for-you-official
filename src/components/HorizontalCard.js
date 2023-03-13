import React from 'react'
import { useNavigate } from 'react-router-dom'
function HorizontalCard(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async()=>{
        navigate(`/posts/${props.id}`)
    }
    return (
        <div className="hc d-flex flex-row align-items-center border border-dark border-2 mt-2" onClick={viewDetailedPost} style={{
            cursor:'pointer'
        }}>
            <div className="poster-division" >
                <img src={props.imageURL} alt="" style={{
                    width:'85px',
                    height:'60px'
                }}/>
            </div>
            <div className="title-division ms-2" style={{
                lineHeight:'15px',
                WebkitLineClamp:3,
                lineClamp:3
            }}>
                <small className='lemonMilk' >{props.title}</small>
            </div>
        </div>
    )
}

export default HorizontalCard