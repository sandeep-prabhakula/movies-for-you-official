import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <>
            <footer className="footer text-center text-white " style={{ backgroundColor: "#212529"}}>

                <div className="container">

                    <section className="mt-2">

                        <div className="col text-center d-flex justify-content-center pt-2 mb-2">
                            <h6 className="text me-3">
                                <Link to="/about-us" className="text-white text-decoration-none">About us</Link>
                            </h6>
                            <h6 className="text me-3">
                                <Link to="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</Link>
                            </h6>
                            <h6 className="text me-3">
                                <Link to="/terms-and-conditions" className="text-white text-decoration-none">Terms and Conditions</Link>
                            </h6>
                            <h6 className="text me-3">
                                <Link to='/contact-us' className="text-white text-decoration-none">
                                    Contact Us
                                </Link>
                            </h6>
                        </div>
                    </section>
                    {/* <section className="text-center mb-2">
                        <a href="https://www.instagram.com/movies4u_official/" className="text-white me-4 text-decoration-none">
                            Instagram
                        </a>
                        <a href="https://twitter.com/movies4u_officl" className="text-white me-4 text-decoration-none">
                            Twitter
                        </a>
                        <a href="https://www.youtube.com/c/Movies4uOfficial" className="text-white me-4 text-decoration-none">
                            YouTube
                        </a>
                    </section> */}
                </div>
                <div
                    className="text-center p-3"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    ©{new Date().getFullYear()} Copyright:Movies4uOfficial
                </div>

            </footer>
        </>
    )
}

export default Footer