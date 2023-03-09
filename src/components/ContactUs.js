import React, { useEffect } from 'react'

function ContactUs() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className="container mt-2">
            <article>
                <header>
                    <h2>
                        <strong>
                            Contact Us
                        </strong>
                    </h2>
                </header>
                <p>
                    Thank you for your interest in  Movies4u Official! We welcome any questions, comments, or feedback you may have about our website.

                    To get in touch with us, email us directly at <a href="mailto:support@movies4uofficial.com">
                        support@movies4uofficial.com
                    </a>
                    . Our team will do our best to respond to your inquiry as soon as possible.

                    If you have any advertising or partnership inquiries, please email us at <a href="mailto:support@movies4uofficial.com">
                        support@movies4uofficial.com
                    </a>. We also encourage you to follow us on social media for the latest updates and news on all your favorite movies. You can find us on  <a href="https://twitter.com/movies4u_officl" target='
                    '>Twitter</a>, <a href="https://www.instagram.com/movies4u_official/" target='
                    '>Instagram</a>, <a href="https://www.youtube.com/c/Movies4uOfficial" target='
                    '>Youtube</a>.

                    Thank you again for your interest in Movies4u. We look forward to hearing from you soon!

                </p>
            </article>
        </div>
    )
}

export default ContactUs