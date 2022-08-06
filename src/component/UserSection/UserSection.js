import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Header from '../Header';
import Login from './Login';
import Register from './Register';
import UserDetail from './UserDetail';
import Wishlist from './Wishlist';
import Cart from './Cart';
import './UserSection.css';


class UserSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        }
    }

    conditionalLinks = () => {
        let { pathname } = this.props.location;
        if (sessionStorage.getItem('loginStatus') == 'LoggedIn') {
            return (
                <NavLink to="/user/username" activeClassName="active" className="tabLinks"><i className="fas fa-user me-3"></i>My Account</NavLink>
            )
        } else {
            return (
                <NavLink to="/user/login" isActive={() => ["/user/login", "/user/register"].includes(pathname)} activeClassName="active" className="tabLinks"><i className="fas fa-user me-3"></i>My Account</NavLink>
            )
        }
    }

    UserPages = () => {
        let userPage = this.props.match.params.userPage;
        if (userPage == 'login') {
            return (
                <Login message={(data) => this.showMessage(data)} />
            )
        } else if (userPage == 'register') {
            return (
                <Register />
            )
        } else if (userPage == 'wishlist') {
            return (
                <Wishlist />
            )
        } else if (userPage == 'cart') {
            return (
                <Cart />
            )
        } else if (userPage == 'username') {
            return (
                <UserDetail />
            )
        }
    }

    showMessage = (data) => {
        this.setState({ message: data });
        document.getElementById('MsgPopUpDiv').style.visibility = 'visible';
        document.getElementById('MsgPopUpDiv').style.right = '-20%';
    }

    closeMsgPopup = () => {
        document.getElementById('MsgPopUpDiv').style.visibility = 'hidden';
    }

    render() {
        const { pathname } = this.props.location;
        return (
            <>
                <Header />
                <div className="container userSection">
                    <div className="row">
                        <div className="col-md-3 userOption">
                            <div className="userOptionLarge d-md-block d-none">
                                {this.conditionalLinks()}
                                <NavLink to="/user/wishlist" activeClassName="active" className="tabLinks"><i className="fas fa-heart me-3"></i>My Wishlist</NavLink>
                                <NavLink to="/user/cart" activeClassName="active" className="tabLinks"><i className="fas fa-shopping-cart me-3"></i>My Cart</NavLink>
                            </div>
                            <div className="userOptionSmall d-md-none d-flex justify-content-around">
                                <button className="tabLinks"><i className="fas fa-user me-3"></i>My Account</button>
                                <button className="tabLinks"><i className="fas fa-heart me-3"></i>My Wishlist</button>
                                <button className="tabLinks"><i className="fas fa-shopping-cart me-3"></i>My Cart</button>
                            </div>
                        </div>
                        <div className="col-md-9 overflow-hidden position-relative">
                            {this.UserPages()}
                        </div>
                    </div>
                    <div id="MsgPopUpDiv">
                        <p className="message">{this.state.message}</p>
                        <span className="msgCloseBtn" onClick={() => this.closeMsgPopup()}><i className="fas fa-times"></i></span>
                    </div>
                </div>

            </>
        )
    }
}


export default withRouter(UserSection);
