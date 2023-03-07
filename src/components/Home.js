import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { onSnapshot, collection, query, where, orderBy, } from 'firebase/firestore'
import { firestore } from '../firebase'
import ReviewItem from "./ReviewItem";
import SocialProfiles from "./SocialProfiles";
import Navbar from "./NavBar";

const Home = (props) => {
  const [reviews, setReviews] = useState([])
  const collectionRef = collection(firestore, 'Posts')
  const updatePosts = async () => {

    // Fetching the posts from server

    // Compound Queries

    // const q = query(collectionRef, where('postType', "==", props.postType))
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   setReviews(snapshot.docs.map(doc => doc.data()).reverse())
    // })
    // return unsubscribe

    
    const posts = JSON.parse(window.sessionStorage.getItem('allPosts'))
    setReviews(posts.filter((item)=>{
      return item.postType === props.postType
    }))
  }


  // useEffect(()=>{},[]) -> runs every time page mounts
  // useEffect(()=>{},[parameter1,parameter2,...]) -> runs every time when there is change in parameters
  // useEffect(()=>{}) -> runs every time 
  useEffect(() => {
    document.title = `Movies4u-official-${props.postType}`
    updatePosts()
    // eslint-disable-next-line
  }, [props.postType])

  return (
    <div>
      <SocialProfiles />
      <div className='container'>
        <h1 className="bebasneue">{props.postType} : </h1>
        <div className="row">
          {reviews.map((element) => {
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
    </div>
  );
};

export default Home;
