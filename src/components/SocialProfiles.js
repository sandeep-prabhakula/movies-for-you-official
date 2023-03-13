import React from 'react'
import instagram from '../icon-assets/instagram.png'
import twitter from '../icon-assets/twitter.png'
import youtube from '../icon-assets/youtube.png'
import telegram from '../icon-assets/telegram.png'
function SocialProfiles() {
    return (
        <>
            <div className="container mt-3">
                <h3 className="bebasneue">Social Profiles: </h3>
                <section className="mb-2">
                    <a href="https://www.instagram.com/movies4u_official/" className="text-dark me-4 text-decoration-none">
                        <img src={instagram} alt="instagram" className='img-fluid' style={{width
                        :'60px',height:'60px'}}/>
                    </a>
                    <a href="https://twitter.com/movies4u_officl" className="text-dark me-4 text-decoration-none">
                    <img src={twitter} alt="twitter" className='img-fluid' style={{width
                    :'60px',height:'60px'}}/>
                    </a>
                    <a href="https://www.youtube.com/c/Movies4uOfficial" className="text-dark me-4 text-decoration-none">
                    <img src={youtube} alt="youtube" className='img-fluid' style={{width
                    :'60px',height:'60px'}}/>
                    </a>
                    <a href="https://telegram.dog/+vXr3hWTAKJg3Mzg1" className="text-dark me-4 text-decoration-none">
                        <img src={telegram} alt="" className='img-fluid' style={{width
                    :'60px',height:'60px'}}/>
                    </a>
                </section>
            </div>
        </>
    )
}

export default SocialProfiles