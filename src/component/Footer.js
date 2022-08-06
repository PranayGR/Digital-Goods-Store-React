import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Footer.css'

class Footer extends Component{
    render() {
        return(
            <>
                <footer className="mt-5">
                    <div className="container">
                        <div className="row">
                            {/* Footer Links Section  */}
                            <div className="col-lg-2 col-md-4 col-sm-6 text-center footerLogo">
                                <Link to="/"><img src="https://i.ibb.co/DzTDBG8/logo-ver.png" alt="Footer Logo"/></Link>
                                <a href="#"><i className="fas fa-caret-right"></i> About</a>
                                <a href="#"><i className="fas fa-caret-right"></i> F.A.Qs</a>
                                <a href="#"><i className="fas fa-caret-right"></i> Privacy Policy</a>
                                <a href="#"><i className="fas fa-caret-right"></i> Terms & Conditions</a>
                            </div>

                            {/* Contact Section */}
                            <div className="col-lg-3 col-md-4 col-sm-6 text-center social">
                                <h4>GET IN TOUCH</h4>
                                <p><i className="fas fa-map-marker-alt"></i>Random Location</p>
                                <p><i className="fas fa-phone-alt"></i>1234567890</p>
                                <p><i className="fas fa-envelope"></i>unknown@xyz.com</p>
                            </div>

                            {/* Social Links Section */}
                            <div className="col-lg-3 col-md-4 col-sm-6 text-center social">
                                <h4>FOLLOW US ON</h4>
                                <div className="socialIcons user-select-none">
                                    <i className="fab fa-facebook-f mx-2"></i>
                                    <i className="fab fa-instagram mx-2"></i>
                                    <i className="fab fa-twitter mx-2"></i>
                                    <i className="fab fa-youtube mx-2"></i>
                                </div>
                            </div>

                            {/* NewsLetter Section */}
                            <div className="col-lg-4 col-md-12 col-sm-6 newsletter">
                                <h4>SUBSCRIBE TO NEWSLETTER</h4>
                                <p className="mt-4">Signup for our weekly newsletter to get the latest news,updates and amazing offers delivered directly to your inbox.</p>
                                <div className="input-group mt-5">
                                    <input type="email" className="form-control" placeholder="Email"/>
                                    <button className="btn primaryBtn" type="button">Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <hr/>

                        {/* CopyRight Section */}
                        <div className="copyright pb-2">
                            <p>&copy; 2022 Digital Box By Pranay. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

export default Footer;