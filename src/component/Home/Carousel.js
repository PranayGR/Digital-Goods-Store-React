import React from 'react';
import './Home.css';


const Carousel = () => {
    return (
        <>
            {/* Offer Banner Carousel */}
                <div id="carouselIndicators" className="carousel slide offerBanner" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="5" aria-label="Slide 6"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://i.ibb.co/hYkQhbZ/consumer-electronics-banner-500x500.png" className="d-block banners img-responsive" alt="Banner 1" data-bs-interval="2000"/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ibb.co/XJZV7Vt/offer-Banner2.jpg" className="d-block banners img-responsive" alt="Banner 2" data-bs-interval="2000"/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ibb.co/61xLNWY/offer-Banner4.jpg" className="d-block banners img-responsive" alt="Banner 4" data-bs-interval="2000"/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ibb.co/YTKynV1/sale-electronics-banner-background-free-vector.jpg" className="d-block banners img-responsive" alt="Banner 3" data-bs-interval="2000"/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ibb.co/DLK6cnc/offer-Banner5.jpg" className="d-block banners img-responsive" alt="Banner 5" data-bs-interval="2000"/>
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.ibb.co/TWws4Q7/offer-Banner6.png" className="d-block banners img-responsive" alt="Banner 6" data-bs-interval="2000"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                    </button>
                </div>
        </>
    )   
}

export default Carousel;