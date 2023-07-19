import React from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

function TermsAndConditions() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className='container mt-2'>
            <Helmet>
                <title>Terms and Conditions</title>

                <meta property='og:title' content='Terms and Conditions' />
                <meta property='og:description' content='Be aware of our terms and conditions' />
                <meta property='og:url' content={window.location.pathname + window.location.search} />
                <meta property='og:type' content='article' />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content='movies4u_officl' />
            </Helmet>
            <h2><strong>Terms and Conditions</strong></h2>
            <p>
                <strong>Use of Content:</strong>   All content published on this website is exclusively for personal use only. Visitors may not use the content for commercial purposes, reproduction, or distribution without obtaining prior written consent from the website owner.
            </p>
            <p>
                <strong>Accuracy of Information:</strong>   The website owner makes every effort to ensure that all information provided on the website is accurate and up-to-date. However, visitors must use their discretion before relying on any information provided on the website.
            </p>
            <p>
                <strong>Copyright:</strong>  All content, including text, images, graphics, videos, and other media, is protected by copyright and intellectual property laws. Visitors may not reproduce, distribute, or use any content without obtaining prior written consent from the website owner.
            </p>
            <p>
                <strong>Third-Party Links:</strong>  The website may contain links to third-party websites. The website owner is not responsible for the content or privacy policies of these websites.
            </p>
            <p>
                <strong>User Submissions:</strong>  Visitors may submit reviews or comments on movies, but the website owner reserves the right to remove any content that is deemed inappropriate or offensive.
            </p>
            <p>
                <strong>Limitation of Liability:</strong>   The website owner is not liable for any damages resulting from the use or inability to use the website or its content, including but not limited to, damages for loss of profits, data, or other intangible losses.
            </p>
            <p>
                <strong>Modification of Terms:</strong>   The website owner reserves the right to modify these terms and conditions at any time without prior notice. Visitors are advised to review the terms and conditions regularly to stay updated.
            </p>
        </div>
    )
}

export default TermsAndConditions