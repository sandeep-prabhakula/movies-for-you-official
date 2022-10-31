import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { onSnapshot, collection, query,where } from 'firebase/firestore'
import { firestore } from '../firebase'
import ReviewItem from "./ReviewItem";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = (props) => {
  const [reviews, setReviews] = useState([])
  const updatePosts = async()=>{
    // Fetching the posts from server
    const collectionRef = collection(firestore, 'Posts')
    const q = query(collectionRef,where('postType',"==",props.postType))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs.map(doc => doc.data()).reverse())
    })
    return unsubscribe
  }
  // useEffect(()=>{},[]) -> runs every time page mounts
  // useEffect(()=>{},[parameter1,parameter2,...]) -> runs every time when there is chamge in parameters
  // useEffect(()=>{}) -> runs every time 
  useEffect(() => {
    document.title = `Movies4U - ${props.postType}`
    updatePosts()
    // eslint-disable-next-line
  },[props.postType])

  return (
    <>
    <Navbar></Navbar>
    <h1 className='text-center' style={{
                marginTop: '75px'
            }}>Movies For You - {props.postType}</h1>
      <div className='container'>
        <div className="row">
          {reviews.map((element) => {
            return <div key={element.id} className="col-md-4">
              <ReviewItem title={element.title ? element.title : ""}
                description={element.description ? element.description : ""}
                imageURL={element.imageURL ? element.imageURL : "https://i.ytimg.com/vi/z2T9NDVpzXk/hqdefault.jpg"}
                videoURL={element.videoURL ? element.videoURL:''}
                typeOfPost={element.postType} />
            </div>
          })}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Home;
