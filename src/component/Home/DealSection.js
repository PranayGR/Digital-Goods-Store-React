import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const productURL = "https://digital-box-api.herokuapp.com/productDetails/"

class DealSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dealProduct: ''
        }
    }

    countdown = () => {
        let days = document.getElementById('days');
        let hours = document.getElementById('hours');
        let minutes = document.getElementById('mins');
        let seconds = document.getElementById('secs');

        if (days, hours, minutes, seconds) {
            const countDate = new Date("June 15, 2022 00:00:00").getTime();
            const now = new Date().getTime();
            const gap = countDate - now;

            // how does time work
            let second = 1000;
            let min = second * 60;
            let hour = min * 60;
            let day = hour * 24;

            // Apply Formula for Time
            days.innerText = ("0" + Math.floor(gap / day)).slice(-2);
            hours.innerText = ("0" + Math.floor((gap % day) / hour)).slice(-2);
            minutes.innerText = ("0" + Math.floor((gap % hour) / min)).slice(-2);
            seconds.innerText = ("0" + Math.floor((gap % min) / second)).slice(-2);
        }
    }

    render() {
        setInterval(this.countdown, 1000);
        let { dealProduct } = this.state;
        return (
            <>
                {/* Deal Of the Day Section */}
                <div className="container dealSection">
                    <h3 className="text-center dealHeading">DEAL OF THE DAY</h3>
                    <div className="row align-items-center">
                        <div className="col-lg-3 dealTimer">
                            <ul>
                                <li><span id="days">00</span> DAYS</li>
                                <li><span id="hours">00</span> HOURS</li>
                                <li><span id="mins">00</span> MINS</li>
                                <li><span id="secs">00</span> SECS</li>
                            </ul>
                        </div>
                        <div className="col-lg-5 col-md-6 text-center">
                            <img src={dealProduct.img1} alt={dealProduct.name} className="dealProductImage img-fluid" />
                        </div>
                        <div className="col-lg-4 col-md-6 dealDetails">
                            <h4 className="mb-4">{dealProduct.description}</h4>
                            <h2>Get 50% Off</h2>
                            <p className="summary">{dealProduct.summary}</p>
                            <Link to={`/details/${dealProduct.id}`} className="btn primaryBtn btnDeal">Buy Now &nbsp; &#8594;</Link>
                        </div>
                    </div>
                </div>

                {/* Promise Section */}
                <div className="container promiseSection">
                    <div className="row justify-content-around">
                        <div className="promise col-3 d-flex align-items-center">
                            <i className="fas fa-truck-moving"></i>
                            <div>
                                <span className="promiseHeading">Free Delivery</span>
                                <span className="promiseSubheading">Worldwide</span>
                            </div>
                        </div>
                        <div className="promise col-3 d-flex align-items-center">
                            <i className="fas fa-headset"></i>
                            <div>
                                <span className="promiseHeading">24 / 7 Support</span>
                                <span className="promiseSubheading">Customer Support</span>
                            </div>
                        </div>
                        <div className="promise col-3 d-flex align-items-center">
                            <i className="fas fa-credit-card"></i>
                            <div>
                                <span className="promiseHeading">Payment</span>
                                <span className="promiseSubheading">Secure System</span>
                            </div>
                        </div>
                        <div className="promise col-3 d-flex align-items-center">
                            <i className="fas fa-handshake"></i>
                            <div>
                                <span className="promiseHeading">Trusted</span>
                                <span className="promiseSubheading">Genuine Products</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        let randomProduct = Math.floor(Math.random() * (151 - 1 + 1)) + 1;

        fetch(`${productURL}${randomProduct}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ dealProduct: data[0] });
            })
    }
}

export default DealSection;