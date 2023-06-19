import React from 'react'
import { Helmet } from 'react-helmet-async'
function MetaDecorator(props) {
    return (

        <Helmet title={props.title} meta={
            [
                { property: 'og:title', content: props.title },
                { property: 'og:description', content: props.description },
                { property: 'og:image', content: props.imageURL },
                
            ]
        }>
            <title>{props.title}</title>
            <meta property='og:image' content={props.imageURL} />
            <meta property='og:title' content={props.title} />
            <meta name='title' content={props.title} />
            <meta property='og:description' content={props.description} />
            <meta name='description' content={props.description} />
            <meta property='og:url' content={window.location.pathname + window.location.search} />
            <meta property='og:type' content='article' />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image:alt" content={props.title} />
            <meta name="twitter:site" content='movies4u_officl' />
        </Helmet>
    )
}

export default MetaDecorator