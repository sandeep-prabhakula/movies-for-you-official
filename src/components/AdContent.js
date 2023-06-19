import React, { useEffect } from 'react'

function AdContent() {
    useEffect(()=>{
        // (window.adsbygoogle = window.adsbygoogle || []).push({ });
    },[])
    return (
        <div className='container d-flex justify-content-center align-items-center'>
            <ins className="adsbygoogle"
                style={{
                    display:'block'
                }}
                data-ad-client="ca-pub-4247948760528935"
                data-ad-slot="6675840903"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    )
}

export default AdContent