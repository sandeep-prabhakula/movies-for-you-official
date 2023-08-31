import React from 'react'
import instagram from '../icon-assets/instagram.svg'
import twitter from '../icon-assets/twitter.svg'
import youtube from '../icon-assets/youtube.svg'
import telegram from '../icon-assets/telegram.svg'
import './SocialProfiles.css'
function SocialProfiles() {
    return (
        <>
            <div className="container mt-3 ">
                <h3 className="bebasneue">Social Profiles: </h3>
                <div className=" container ms-2 mb-2">
                    <a href="https://www.instagram.com/movies4u_official/" className="text-dark me-4 text-decoration-none" target='_blank'>
                        <img src={instagram} alt="instagram" className='img-fluid mProfile' />
                    </a>
                    <a href="https://twitter.com/movies4u_officl" className="text-dark me-4 text-decoration-none" target='_blank'>
                    <img src={twitter} alt="twitter" className='img-fluid mProfile' />
                    </a>
                    <a href="https://www.youtube.com/c/Movies4uOfficial" className="text-dark me-4 text-decoration-none" target='_blank'>
                    <img src={youtube} alt="youtube" className='img-fluid mProfile' />
                    </a>
                    <a href="https://telegram.dog/+vXr3hWTAKJg3Mzg1" className="text-dark me-4 text-decoration-none" target='_blank'>
                        <img src={telegram} alt="telegram" className='img-fluid mProfile' />
                    </a>
                </div>
            </div>
        </>
    )
}

export default SocialProfiles