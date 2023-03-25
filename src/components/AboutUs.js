import React from 'react'
import { useEffect } from 'react'
function AboutUs() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className="container mt-3">
            <article>
                <section>
                    <header>
                        <h2>
                            <strong>
                                About Movies4U
                            </strong>
                        </h2>
                    </header>
                    <p>Welcome to Movies4U, your ultimate destination for everything related to movies! We are a team of dedicated movie enthusiasts who are passionate about bringing you the latest updates, reviews, and insights on all things related to the world of cinema.</p>
                    <p>
                        Movies4u Official is your one-stop-shop for all your movie-related needs. Whether you are looking for exclusive film updates, the latest box-office collections, or recommendations on what to watch next, we've got you covered.
                    </p>

                    <p>
                        At Movies4u, we understand that movies are more than just a form of entertainment; they are an art form that can inspire, educate, and entertain. That's why we are committed to providing you with the most accurate and insightful content possible.
                    </p>
                    <p>
                        Our team of experienced writers and editors are passionate about movies and are committed to delivering the most up-to-date information and reviews. We pride ourselves on our ability to provide you with unbiased opinions on the latest releases, as well as hidden gems that you may have missed.
                    </p>
                    <p>
                        Thank you for choosing Movies4u Official as your go-to destination for all things related to movies. We hope that you enjoy your experience with us and that you continue to visit us for all your movie-related needs!
                    </p>
                </section>
            </article>
        </div >
    )
}

export default AboutUs