import React from 'react'

function PostPath(props) {
  return (
    <nav style={{
        "--bs-breadcrumb-divider": "url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='currentColor'/%3E%3C/svg%3E&#34;)",

    }} aria-label="breadcrumb" className='ms-2'>
        <ol className="breadcrumb">
            <li className=" me-1">
                <small className='cobertCondesnedItalic' style={{ fontSize: '10px' }}>
                    Movies4U-Official &lt;
                </small>
            </li>
            <li className="me-1">
                <small className='cobertCondesnedItalic' style={{ fontSize: '10px' }}>
                    {props.postType} &lt;
                </small>
            </li>
            <li className=" active" aria-current="page">
                <small className='cobertCondesnedItalic' style={{ fontSize: '10px' }}>
                    {(navigator.userAgent.indexOf('Android') !== -1) && props.title.length > 15 ? props.title.substring(0, 35) + "..." : " " + props.title}
                </small>
            </li>
        </ol>
    </nav>
  )
}

export default PostPath