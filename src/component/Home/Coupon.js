import React from 'react';
import './Home.css';

const Coupon = () =>{

    // To Load Coupon on Window Load
    {
        window.addEventListener('load', function(){
            setTimeout(() => {    
                let coupon = document.getElementById('couponPopup');
                if(coupon){
                    coupon.style.display = 'block';
                }
            },3000)
        })
    }

    // Function to Close the Coupon
    const closePopup = () =>{
        let coupon = document.getElementById('couponPopup');
        if(coupon){
            coupon.style.display = 'none';   
        }
    };


    return(
        <>
            <div className="coupon" id="couponPopup">
                <h1 className="text-center mt-5 couponHeading">WANT <br/><span>20% OFF?</span></h1>
                <p className="text-center mt-3 mb-md-5 mb-3 text-white">Subscribe now to get free discount coupon code. Don't miss Out!</p>
                <form>
                    <input type="email" className="form-control couponEmail mx-auto" placeholder="Enter your email address"/>
                    <button className="btn btnCoupon text-center mx-auto d-block mt-2 mb-4">SUBSCRIBE</button>
                </form>
                <p className="text-center couponCloseLink"><span onClick={closePopup}>Enter Site without Coupon</span></p>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-light couponCloseBtn" onClick={closePopup}>
                &times;
                </span>
            </div>
        </>
    )
}

export default Coupon;