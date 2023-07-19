import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'

function Disclaimer() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='container mt-2'>
            <Helmet>
                <title>Disclaimer</title>

                <meta property='og:title' content='Disclaimer' />
                <meta property='og:description' content='Disclaimer' />
                <meta property='og:url' content={window.location.pathname + window.location.search} />
                <meta property='og:type' content='article' />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content='movies4u_officl' />
            </Helmet>
            <h2>
                <strong>
                    Disclaimer :
                </strong>
            </h2>
            <p>
                The information provided on this website is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </p>
            <p>
                In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
            <p>
                Through this website, you may be able to link to other websites that are not under our control. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </p>

            <p>
                Every effort is made to keep the website up and running smoothly. However, we take no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
            </p>
            <p>
                The opinions expressed on this website are those of the individual authors and do not necessarily reflect the views of the website owner. We do not claim any ownership or copyright to any of the images or videos used on this website, unless otherwise noted.
            </p>
            <p>
                Finally, please note that the movie-related information provided on this website is intended for entertainment purposes only. We do not claim to be experts in the film industry and our opinions should not be taken as professional advice. We encourage our readers to conduct their own research and make informed decisions when it comes to choosing which movies to watch or investing in the film industry.
            </p>
        </div>
    )
}

export default Disclaimer