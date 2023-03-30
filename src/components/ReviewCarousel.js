import React from 'react'
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel'
import ReviewCarouselItem from './ReviewCarouselItem';

function ReviewCarousel(props) {
    const reviews = props.reviews
    return (
        <>
            <div className="container mt-3 mb-1">
            <h1 className='bebasneue'>Reviews</h1>
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
                    {reviews.map((element)=>{
                        return <div key={element.postedTime}>
                            <div className="container">
                                <ReviewCarouselItem postedTime={element.postedTime} title={element.title} imageURL={element.imageURL}/>
                            </div>
                        </div>
                    })}
                </Carousel>
            </div>
        </>
    )
}

export default ReviewCarousel