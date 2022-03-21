import React from 'react'
import AuthContext from '../context/auth/AuthContext';
import { useContext } from 'react';
function Home() {
    const context = useContext(AuthContext)
    const { user, signInUser } = context
    const handleSignIn = () => {
        signInUser()
    }
    return (
        <div className='container'>
            <h1 style={{
                marginTop: '70px'
            }}>Home</h1>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://d27fp5ulgfd7w2.cloudfront.net/wp-content/uploads/2019/01/02134600/Movie-Blogs-1.jpg" className="d-block w-100" alt="..." style={{
                            width: '100%',
                            height: '400px'
                        }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Some representative placeholder content for the first slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://d27fp5ulgfd7w2.cloudfront.net/wp-content/uploads/2019/01/02134600/Movie-Blogs-1.jpg" className="d-block w-100" alt="..." style={{
                            width: '100%',
                            height: '400px'
                        }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Some representative placeholder content for the second slide.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="https://d27fp5ulgfd7w2.cloudfront.net/wp-content/uploads/2019/01/02134600/Movie-Blogs-1.jpg" className="d-block w-100" alt="..." style={{
                            width: '100%',
                            height: '400px'
                        }} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container my-3">
                <button className='btn btn-primary' onClick={handleSignIn} style={{
                    display: user !== null ? 'none' : 'inline'
                }}>Sign in with Google</button>
            </div>
            <h2>Contact Us</h2>
            <div className="container d-flex flex-row justify-content-between">
                <a href="https://www.instagram.com/movies4u_official/">Instagram</a>
                <a href="https://mobile.twitter.com/Movies4u_Officl">Twitter</a>
                <a href="https://www.youtube.com/c/CINEPHILEADDA">Youtube</a>
                <a href="telegram.com/">Telegram</a>
            </div>
        </div>
    )
}

export default Home