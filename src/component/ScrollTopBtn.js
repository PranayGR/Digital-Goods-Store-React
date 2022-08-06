import React from 'react';
import './Home/Home.css';

const ScrollTopBtn = () => {
    // Click to Scroll To Top
    const scrollTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    {
        let scrollTopBtn = document.getElementById('scrollTopBtn')
        if(scrollTopBtn) {
            // Scroll to Top Appear
            window.addEventListener('scroll', function() {
                if(document.body.scrollTop > 500 || document.documentElement.scrollTop > 500){
                    scrollTopBtn.style.visibility = 'visible';
                } else{
                    scrollTopBtn.style.visibility = 'hidden';
                }
            })
        }
    }

    return (
        <>
            {/* Scroll to Top Button */}
            <div id="scrollTopBtn" onClick={scrollTop}>
                <button><i className="fas fa-chevron-up"></i></button>
            </div>
        </>
    )

}

export default ScrollTopBtn;