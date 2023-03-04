import React from 'react'
import instagram from '../icon-assets/instagram.png'
import twitter from '../icon-assets/twitter.png'
import youtube from '../icon-assets/youtube.png'
function SocialProfiles() {
    return (
        <>
            <div className="container mt-3">
                <h3 className="bebasneue">Social Profiles: </h3>
                <section className="mb-2">
                    <a href="https://www.instagram.com/movies4u_official/" className="text-dark me-4 text-decoration-none">
                        <img src={instagram} alt="instagram" className='img-fluid'/>
                    </a>
                    <a href="https://twitter.com/movies4u_officl" className="text-dark me-4 text-decoration-none">
                    <img src={twitter} alt="twitter" className='img-fluid'/>
                    </a>
                    <a href="https://www.youtube.com/c/Movies4uOfficial" className="text-dark me-4 text-decoration-none">
                    <img src={youtube} alt="youtube" className='img-fluid'/>
                    </a>
                </section>
            </div>
        </>
    )
}

export default SocialProfiles