import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import { firestore } from '../firebase'
import { arrayUnion, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import Comment from './Comment';
import SocialProfiles from './SocialProfiles';
import Navbar from './NavBar';
import ReviewItem from './ReviewItem';

function DetailedPost() {

    const commentsDB = collection(firestore, 'Comments')

    const [currentPost, setCurrentPost] = useState({})

    const location = useLocation();

    const { postID } = useParams();

    const [recentPosts, setRecentPosts] = useState([])
    const [comment, SetComment] = useState('')
    const [commentorName, setCommentorName] = useState('');
    const [commentsListState, setcommentsListState] = useState([])
    const [postedDate,setPostedDate] = useState('')

    const onSubmitComment = async (e) => {
        e.preventDefault()
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        let ref = doc(commentsDB, `${postID}`)
        if (comment !== '' && commentorName !== '') {
            await updateDoc(ref, {
                commentsList: arrayUnion({
                    'timestamp': timestamp,
                    'name': commentorName,
                    'comment': comment
                })
            })
            setCommentorName('')
            SetComment('')
        } else {
            console.log("empty Credentials")
        }
    }

    const getRecentPosts = async () => {
        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'));
        let tempRecentPosts = []
        if (allPosts.length < 3) setRecentPosts(allPosts.filter((item)=>{
            return item.postedTime!== Number(postID)
        }))
        else {
            for (let i = 0; i < 3; i++)tempRecentPosts.push(allPosts[i]);
            setRecentPosts(tempRecentPosts.filter((item)=>{
                return item.postedTime!==Number(postID)
            }))
        }
    }

    const getAllComments = async () => {
        const ref = doc(firestore, 'Comments', `${currentPost.id}`)
        const docSnap = await getDoc(ref)
        const data = docSnap.data()
        setcommentsListState(data.commentsList)
    }

    useEffect(() => {
        // getAllComments() 
        let allPosts = JSON.parse(window.sessionStorage.getItem('allPosts'))
        allPosts = allPosts.filter((item) => {
            return item.postedTime === Number(postID)
        })
        setCurrentPost(allPosts[0])
        getRecentPosts()
        let dateAndTime = new Date(currentPost.postedTime)
        let stringDate = dateAndTime.toString().slice(0,21)
        setPostedDate(stringDate)
    }, [])


    const handleComment = (e) => {
        SetComment(e.target.value)
    }
    const handleCommentorName = (e) => {
        setCommentorName(e.target.value)
    }


    return (
        <>
            <Navbar />
            <nav style={{
                "--bs-breadcrumb-divider": "url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;)",

            }} aria-label="breadcrumb" className='ms-2'>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item ">
                        <small className='cobertCondesnedItalic' style={{ fontSize: '10px' }}>
                            Movies4U-Official
                        </small>
                    </li>
                    <li className="breadcrumb-item">
                        <small className='cobertCondesnedItalic' style={{ fontSize: '10px' }}>
                            {currentPost.postType}
                        </small>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <small className='cobertCondesnedItalic' style={{ fontSize: '10px' }}>
                            {currentPost.title}
                        </small>
                    </li>
                </ol>
            </nav>

            <div className="container d-flex flex-column justify-content-center">
                <h1 className="bebasneue">{currentPost.title}</h1>
                <div className='container d-flex flex-column justify-content-between align-items-end'>

                    <small className='cobertCondesnedItalic'>
                        {new Date(currentPost.postedTime).toString().slice(3,21)} - {currentPost.writtenBy}
                    </small>
                </div>
                <img src={currentPost.imageURL} alt={currentPost.title} className='img-fluid' />
                <div className='container d-flex flex-column justify-content-center align-items-center'>

                    <small className='cobertCondesnedItalic mt-2' style={{ fontSize: '10px' }}>{currentPost.imageTitle}</small>
                </div>
                <p className='openSans mt-3'>

                    {currentPost.description}
                </p>
            </div>
            <div className="container">
                <div className="row">
                    {recentPosts.map((element) => {
                        return <div key={element.postedTime} className="col-md-3">
                            <ReviewItem title={element.title ? element.title : ""}
                                description={element.description ? element.description : ""}
                                imageURL={element.imageURL ? element.imageURL : "https://i.ytimg.com/vi/z2T9NDVpzXk/hqdefault.jpg"}
                                videoURL={element.videoURL ? element.videoURL : ''}
                                typeOfPost={element.postType}
                                id={element.postedTime}
                                titleOfPoster={element.imageTitle}
                                writtenBy={element.writtenBy}
                                yearOfRelease={element.yearOfRelease} />
                        </div>
                    })}
                </div>
            </div>
            {/* Comments */}
            {/* commented for testing audience */}
            {/* <div className="container my-2">
                <h3>Comments : </h3>
                {commentsListState ? commentsListState.map((currentComment) => {
                    return <div key={currentComment.timestamp}>
                        <Comment
                            name={currentComment.name}
                            comnt={currentComment.comment}
                            commentTimestamp={currentComment.timestamp}
                        />
                    </div>
                }):console.log('no comments')}
            </div> */}


            {/* Comment Form */}

            <div className="container">
                <h3>Add Comment : </h3>
                <Form onSubmit={onSubmitComment}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" value={commentorName} placeholder="name@example.com" onChange={handleCommentorName} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
                        <textarea value={comment} className="form-control" id="exampleFormControlTextarea1" rows="2" onChange={handleComment}></textarea>
                    </div>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit">
                            Upload Comment
                        </Button>
                    </div>
                </Form>
                <SocialProfiles />
            </div>

        </>
    )
}

export default DetailedPost