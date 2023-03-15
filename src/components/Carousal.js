import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselItem from './CarouselItem';


function Carousal(props) {

    const cards = props.slides.slice(0,5)
    return (
        <div className="container mt-3 mb-1" style={{
            display:`${cards.length!==0?'block':'none'}`
        }}>
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

                    <div key={item.postedTime} className='me-2 container' >
                        <CarouselItem postedTime={item.postedTime} imageURL={item.imageURL} title={item.title} />
                    </div>
                )):console.log('...')}
            </Carousel>
        </div>
    )
}

export default Carousal