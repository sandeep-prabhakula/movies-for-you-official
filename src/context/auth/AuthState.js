import React from 'react'
import AuthContext from './AuthContext'
import { useState } from 'react'
import firebase from '../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const AuthState = (props) => {
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(null)
    const postsInitial = []
    const [posts,setPosts] = useState(postsInitial)
    let auth = firebase.auth()
    const provider = new GoogleAuthProvider();
    const ref = firebase.firestore().collection('users')
    const postRef = firebase.firestore().collection('posts')

    // new User Sign in
    const signInUser = async () => {
        const res = await signInWithPopup(auth, provider)
        let curUser = res.user
        console.log(process.env.REACT_APP_ADMIN_UID)
        if (process.env.REACT_APP_ADMIN_UID === curUser.uid) {
            setAdmin(curUser.uid)
        } else {
            setAdmin(null)
        }
        ref.doc(curUser.uid).get().then((doc) => {
            if (!doc.exists) {
                ref.doc(curUser.uid).set({
                    "uid": curUser.uid,
                    "userEmail": curUser.email,
                    "userImage": curUser.photoURL,
                    "userName": curUser.displayName,
                })
            }
        })
    }

    
    // on User Changed
    auth.onAuthStateChanged((user) => {
        setUser(user)
        if (user.uid === process.env.REACT_APP_ADMIN_UID) setAdmin(user.uid)
    })
    
    // Sign out Function
    const signOut = async () => {
        await auth.signOut()
        auth.onAuthStateChanged((user) => {
            setUser(user)
        })
        setAdmin(null)
    }

    // Add new Post
    const addPost = async (title, description, curTime) => {
        const movie = {
            "postTitle": title,
            "postDescription": description,
            "postedDate": curTime,
            "likes":[],
            "comments":[]
        }
        await postRef.doc(title).set(movie)
        setPosts(posts.concat(movie))
    }

    // Read all post
    const readAllPost = async()=>{
        const data = await postRef.get()
        const items = []
        data.docs.forEach((data)=>{
            items.push(data.data())
        })
        setPosts(items)
    }

    // Update Post
    const updatePost = async(postId,title,description)=>{
        postRef.doc(postId).update({
            "postTitle":title,
            "postDescription":description
        })
    }

    // Delete Post 
    const deletePost = async (postId) => {
        const newPosts = posts.filter((post)=>{
            return post.postTitle !== postId
        })
        await postRef.doc(postId).delete()
        setPosts(newPosts)
    }

    const updateLikes = async (postId)=>{
        let post = await postRef.doc(postId).get()
        let likes = []
        likes = post.get('likes')
        console.log(likes)
        let isLiked = likes.includes(auth.currentUser.email)
        console.log(isLiked)
        if(isLiked){
            const index = likes.indexOf(auth.currentUser.email)
            if(index>-1){
                likes.splice(likes,1)
            }
            await postRef.doc(postId).update({
                "likes":likes
            })
        }else{
            likes.push(auth.currentUser.email)
            await postRef.doc(postId).update({
                "likes":likes
            })
        }
        
    }
    const likeCount = async(postId)=>{
        let post = await postRef.doc(postId).get()
        let likes = []
        likes = await post.get('likes')
        return likes.length
    }
    return (
        <AuthContext.Provider value={{ user, signInUser, signOut, admin, addPost, deletePost ,posts ,readAllPost ,updatePost,updateLikes,likeCount}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthState