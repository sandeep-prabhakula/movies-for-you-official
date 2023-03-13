import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUserAuth } from "../context/UserAuthContext";
import { useCallback } from 'react';
import ReviewItem from './ReviewItem'
import searchicon from '../icon-assets/searchicon.png'
function Navbar() {
    const { user } = useUserAuth()
    let location = useLocation();
    const [searchedPosts, setSearchedPosts] = useState([]);
    React.useEffect(() => {
    }, [location]);
    const { logOut } = useUserAuth();
    const modalRef = useRef(null)


    const debounce = (func) => {
        let timer
        return function (...args) {
            const context = this
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                timer = null
                func.apply(context, args)
            }, 500)
        }
    }


    const handleSelect = () => {
        // document.querySelector('.navbar-collapse').classList.remove('show');

        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse) {
            navbarCollapse.classList.remove('show');
        }
    }

    const onTextChangeListener = (e) => {
        const { value } = e.target
        const jsonArrayOfItems = JSON.parse(window.sessionStorage.getItem('allPosts'))
        setSearchedPosts(jsonArrayOfItems.filter((item) => {
            return item.title.includes(value) || item.description.includes(value) || item.writtenBy.includes(value)
        }))

    }


    const optimizedSearch = useCallback(debounce(onTextChangeListener), [])

    return (
        <>
            {/* Modal  */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Search</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={optimizedSearch} />


                            {searchedPosts.map((element) => {
                                return <div key={element.postedTime} className="row-md-3 mt-3">
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
            </div>


{/* logo link */}
            <div className='d-flex flex-row justify-content-center align-items-center '>
                <Link className="navbar-brand" to="/">
                    <img src="/logo.png" alt="movies4u" className='img-fluid' />
                </Link>
            </div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark" onSelect={handleSelect()}>
                <div className="container-fluid">


                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/exclusive-updates" ? 'active' : ''}`} to="/exclusive-updates">Exclusive Updates</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/latest-updates" ? 'active' : ''}`} to="/latest-updates">Latest Updates</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/latest-buzz" ? 'active' : ''}`} to="/latest-buzz">Latest Buzz</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/reviews" ? 'active' : ''}`} aria-current="page" to="/reviews">Reviews</Link>
                            </li>
                            <li className={`nav-item ${location.pathname === "/suggestions" ? 'active' : ''}`}>
                                <Link className="nav-link" to="/suggestions">Suggestions</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/box-office-collections" ? 'active' : ''}`} to="/box-office-collections">Box Office Collections</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/add-post" ? 'active' : ''}`} style={{
                                    display: user.uid && user.uid === process.env.REACT_APP_ADMIN_UID  ? 'flex' : 'none'
                                }} to="/add-post">Add Post</Link>
                            </li> */}
                        </ul>
                        {/* <Button className='btn btn-primary' onClick={handleLogout}>Sign out</Button> */}
                    </div>

                    {/* <button type="button" className="btn btn-warning " ref={modalRef} data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Search
                    </button> */}

                    <img src={searchicon} alt="searchicon" ref={modalRef} data-bs-toggle="modal" data-bs-target="#exampleModal" />

                    {/* search icon */}


                </div>
            </nav>
        </>
    )
}

export default Navbar