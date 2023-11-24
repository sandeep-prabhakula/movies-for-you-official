import React from 'react'
import instagram from '../icon-assets/instagram.svg'
import twitter from '../icon-assets/twitter.svg'
import youtube from '../icon-assets/youtube.svg'
import telegram from '../icon-assets/telegram.svg'
import './SocialProfiles.css'
function SocialProfiles() {
    const links = [
        {
            id:1,
            link:"https://www.instagram.com/movies4u_official/",
            url: instagram,
            alt:"instagram"
        },
        {
            id:2,
            link:"https://twitter.com/movies4u_officl",
            url: twitter,
            alt:"twitter"
        },
        {
            id:3,
            link:"https://www.youtube.com/c/Movies4uOfficial",
            url: youtube,
            alt:"youtube"
        },
        {
            id:4,
            link:"https://telegram.dog/+vXr3hWTAKJg3Mzg1",
            url: telegram,
            alt:"telegram"
        }
    ]
    return (
        <>
            <div className="container mt-3 ">
                <h3 className="bebasneue">Social Profiles: </h3>
                <div className=" container ms-2 mb-2 ">
                    {links.map((item)=>{
                        return <a href={item.link} className="text-dark me-4 text-decoration-none" target='_blank' key={item.id}>
                        <img src={item.url} alt={item.alt} className='img-fluid mProfile' />
                    </a>    
                    })}
                </div>
            </div>
        </>
    )
}

export default SocialProfiles