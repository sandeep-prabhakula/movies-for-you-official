import React, { useEffect } from 'react'

function PrivacyPolicy() {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    return (
        <div className='container mt-2'>
            <h2>
                <strong>
                    Privacy Policy
                </strong>
            </h2>
            <p>

                Thank you for visiting our website, which is operated by Movies4u. We are committed to protecting the privacy of our users, and this Privacy Policy is designed to explain how we collect, use, and disclose information about you when you use our website.
            </p>
            <p>

                <strong> Information We Collect : </strong>
                We collect information about you in various ways when you use our website. For example, we collect information you provide to us, such as your name, email address, and any other information you choose to provide.
            </p>
            <p>

                <strong> How We Use Your Information : </strong>
                We use the information we collect to provide, maintain, and improve our website and the services we offer. For example, we may use your information to:

                Respond to your inquiries and provide customer support
                Send you newsletters and other communications about our website and the movies we cover
                Personalize your experience on our website
                Analyze how our website is used and improve its functionality
                Comply with legal requirements and enforce our policies.
                We may also use your information for other purposes with your consent.
            </p>
            <p>

                <strong> Sharing of Your Information : </strong>
                We may share your information with third parties in certain circumstances, such as:

                With your consent
                To comply with legal requirements or respond to lawful requests and legal process
                To protect our rights, property, or safety, or the rights, property, or safety of others
                To third-party service providers who perform services on our behalf, such as hosting, data analysis, and customer service
                We may also share aggregate or de-identified information that cannot be used to identify you with third parties.
            </p>
            <p>

                <strong> Your Choices : </strong>
                You can choose not to provide us with certain information, but that may limit your ability to use some features of our website. You can also choose to unsubscribe from our newsletters and other communications by following the instructions provided in those communications.
            </p>
            <p>

                <strong> Security of Your Information : </strong>
                We take reasonable measures to protect your information from unauthorized access, use, disclosure, alteration, or destruction. However, no security measures are 100% effective, and we cannot guarantee the security of your information.
            </p>
            <p>

                <strong> Changes to this Privacy Policy : </strong>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. If we make material changes to this Privacy Policy, we will notify you by email or by posting a notice on our website prior to the effective date of the changes.
            </p>
            <p>
                <strong> Contact Us : </strong>
                If you have any questions or concerns about this Privacy Policy, please contact us at <a href="malito:support@movies4uofficial.com">support@movies4uofficial.com</a>
            </p>

        </div>
    )
}

export default PrivacyPolicy