import React from 'react'
import { useNavigate } from 'react-router-dom'
function HorizontalCard(props) {
    const navigate = useNavigate()
    const viewDetailedPost = async()=>{
        navigate(`/posts/${props.id}`)
    }
    return (
        <div className="hc d-flex align-items-center border border-dark border-1 mt-3" onClick={viewDetailedPost} style={{
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

        // <div className="card mb-2 border border-dark border-1 d-flex" onClick={viewDetailedPost} style={{
        //     cursor: 'pointer',
        // }}>
        //     <img src={props.imageURL} className="card-img-top img-fluid" alt="..." />
        //     <div className="card-body">
        //         <p className="lemonMilk card-text" style={{ lineHeight: '20px' }}>{props.title}</p>
        //     </div>
        // </div>
    )
}

export default HorizontalCard