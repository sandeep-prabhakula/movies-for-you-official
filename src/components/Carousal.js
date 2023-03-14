import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Carousal(props) {
    const cards = props.slides.reverse().slice(0,4)
    return (
        <div className="container mt-3 mb-1">
            <h1 className='bebasneue'>{props.postType}</h1>
            <Carousel
                responsive={{
                    desktop: {
                        breakpoint: { max: 3000, min: 1024 },
                        items: 3,
                    },
                    tablet: {
                        breakpoint: { max: 1024, min: 464 },
                        items: 2,
                    },
                    mobile: {
                        breakpoint: { max: 464, min: 0 },
                        items: 1,
                    },
                }}
                infinite={true}
                slidesToSlide={1}
                arrows={true}
                containerClass="carousel-container"
            >
                {cards?cards.map((item, index) => (

                    <div key={item.postedTime} className='me-2'>
                        <div className="card bg-dark text-white">
                            <img src={item.imageURL} class="card-img img-fluid" alt="..."/>
                                <div className="card-img-overlay position-relative bottom-0">
                                    <small className="lemonMilk">{item.title}</small>
                                </div>
                        </div>
                    </div>
                )):console.log('...')}
            </Carousel>
        </div>
    )
}

export default Carousal