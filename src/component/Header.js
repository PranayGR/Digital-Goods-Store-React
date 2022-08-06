import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

const converterURL = "https://freecurrencyapi.net/api/v2/latest?apikey=55db6ac0-7b7c-11ec-8082-d5ad37ab331c&base_currency=INR";
const userInfoURL = "https://digital-box-login-api.herokuapp.com/api/auth/userinfo";
const productURL = "https://digital-box-api.herokuapp.com/products";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: '',
            filteredData: '',
            searchType: ''
        }
    }

    // Conditional Header
    conditionalHeader = () => {
        if (this.state.userData.firstName) {
            let user = this.state.userData;
            let userArray = [user.firstName, user.lastName, user.email, user.phone, user.role];
            sessionStorage.setItem('userInfo', JSON.stringify(userArray));
            return (
                <span>Hi, {user.firstName} {user.lastName} | <span className="text-danger logoutBtn" onClick={this.handleLogOut}>Logout</span></span>
            )
        } else {
            return (
                <span style={{ cursor: 'pointer' }}><Link to='/user/login'>Login</Link> / <Link to='/user/register'>Create Account</Link></span>
            )
        }
    }

    // Conditional topLinks
    conditionalLink = () => {
        if (sessionStorage.getItem('loginStatus') == 'LoggedIn') {
            return (
                <Link to="/user/username"><i className="userLinks fas fa-user me-3"></i></Link>
            )
        } else {
            return (
                <Link to="/user/login"><i className="userLinks fas fa-user me-3"></i></Link>
            )
        }
    }

    // Logout
    handleLogOut = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('ltk');
        sessionStorage.setItem('loginStatus', 'LoggedOut');
        this.setState({ userData: '' });
        this.props.history.push('/');
    }

    // Weather App
    showPosition = (data) => {
        let x = document.getElementById('weatherImage');
        let y = document.getElementById('temperature');

        let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&mode=json&units=metric&cnt=1&APPID=2b5ab3bc294fc9f57cd2c0e0acaa541a`;

        fetch(weatherURL)
            .then((res) => res.json())
            .then((data) => {
                x.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt='weather'/>`
                y.innerText = `${data.main.temp}\u00B0C`;
            })
    }

    // Dropdown Open on Click
    openCategories = () => {
        let collapsableCategory = document.getElementById('collapsableCategory');

        if (collapsableCategory.style.display == 'none') {
            collapsableCategory.style.display = 'flex';
        } else {
            collapsableCategory.style.display = 'none';
        }
    }

    priceChange = (event) => {
        // Currency Converter
        let Prices = document.querySelectorAll('.price');
        let currencySymbol = document.querySelectorAll('.currencySymbol');
        let currency = event.target.value;
        fetch(converterURL, { method: 'GET' })
            .then(res => res.json())
            .then((Data) => {
                for (let i = 0; i < Prices.length; i++) {
                    if (currency == 'usd') {
                        for (let j = 0; j < currencySymbol.length; j++) {
                            currencySymbol[j].innerText = '$';
                        }
                        Prices[i].innerText = `${Number(Number(Prices[i].innerText) * Data.data.USD).toFixed(2)}`;
                    } else if (currency == 'eur') {
                        for (let j = 0; j < currencySymbol.length; j++) {
                            currencySymbol[j].innerText = '€';
                        }
                        Prices[i].innerText = `${Number(Number(Prices[i].innerText) * Data.data.EUR).toFixed(2)}`
                    }
                }
            })
    }

    findResults = (event) => {
        let search = event.target.value;
        fetch(productURL, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                let results = data.filter((item) => {
                    return item.description.toLowerCase().indexOf(search.toLowerCase()) > -1;
                })
                this.setState({ filteredData: results });
            })
    }

    showResults = (results) => {
        if (results) {
            return results.map((item) => {
                return (
                    <p className="ItemName" key={item.key}>{item.description}</p>
                )
            })
        }
    }

    render() {
        return (
            <>
                <header>
                    <div className="container d-flex justify-content-between align-items-center">

                        {/* Currency Converter Menu  */}
                        <div className="currencySelectContainer ms-3">
                            <select className="currencySelect" onChange={this.priceChange}>
                                <option value="rs">RS - ₹</option>
                                <option value="usd">USD - $</option>
                                <option value="eur">EUR - €</option>
                            </select>
                            <span><i className="fas fa-sort-down"></i></span>
                        </div>

                        {/* Top Login/Signup Links */}
                        <div className="topLinks me-3">
                            {this.conditionalHeader()}
                        </div>
                    </div>
                </header>

                <div className="container-fluid navbarContainer position-relative">
                    <div className="container">
                        {/* NavBar */}
                        <nav className="navbar navbar-light justify-content-between align-items-center">
                            <div className="container-fluid">
                                <Link to='/' className="navbar-brand"><img src="https://i.ibb.co/k0h6RvV/logo-hor.png" alt="DigitalBox Logo" /></Link>
                                <form>
                                    <div className="d-md-flex d-none position-relative">
                                        <input className="form-control searchForm" type="search" placeholder="Search Products" aria-label="Search" onChange={(event) => this.findResults(event)}/>
                                        <button type="button" className="btn primaryBtn">SEARCH</button>
                                        <div className="position-absolute searchResults d-none" id="searchResults">{this.showResults(this.state.filteredData)}</div>
                                    </div>
                                </form>
                                <div className="userIcons">
                                    <Link to="/user/cart"><i className="userLinks fas fa-shopping-cart me-3"></i></Link>
                                    {/* <Link to="/user/login"><i className="userLinks fas fa-user me-3"></i></Link> */}
                                    {this.conditionalLink()}
                                    <Link to="/user/wishlist"><i className="userLinks fas fa-heart me-3"></i></Link>
                                </div>
                                <a className="d-md-none d-inline-block" data-bs-toggle="offcanvas" href="#ResponsiveMenu" role="button" aria-controls="ResponsiveMenu">
                                    <i className="fas fa-bars menuIcon"></i>
                                </a>
                            </div>
                        </nav>


                        {/* Nav-Links */}
                        <div className="container-fluid navLinksContainer d-md-block d-none" id="navLinksContainer">
                            <ul type="none" className="navLinks d-flex align-items-center">
                                <li className="categoryList">
                                    <div className="dropdown categoryLink">
                                        <span className="navLink">CATEGORIES &nbsp; <i className="fas fa-bars"></i></span>
                                    </div>
                                    <ul className="dropdown-menu categoryDropDown">
                                        <li>
                                            <Link to={"/listing/1"} className="dropdown-item categoryItem d-flex align-items-center justify-content-between">Smartphones<i className="fas fa-angle-right"></i></Link>
                                        </li>
                                        <li>
                                            <Link to={'/listing/2'} className="dropdown-item categoryItem d-flex align-items-center justify-content-between">Televisions <i className="fas fa-angle-right"></i></Link>
                                        </li>
                                        <li>
                                            <Link to="/listing/3" className="dropdown-item categoryItem d-flex align-items-center justify-content-between">Laptops <i className="fas fa-angle-right"></i></Link>
                                        </li>
                                        <li>
                                            <Link to="/listing/4" className="dropdown-item categoryItem d-flex align-items-center justify-content-between">Cameras <i className="fas fa-angle-right"></i></Link>
                                        </li>
                                        <li>
                                            <Link to="/listing/5" className="dropdown-item categoryItem d-flex align-items-center justify-content-between">SmartWatches <i className="fas fa-angle-right"></i></Link>
                                        </li>
                                        <li>
                                            <Link to="/listing/6" className="dropdown-item categoryItem d-flex align-items-center justify-content-between border-bottom-0">Accesories <i className="fas fa-angle-right"></i></Link>
                                        </li>
                                    </ul>
                                </li>
                                <li><a href="index.html" className="navLink">HOME</a></li>
                                <li><a href="product_list.html" className="navLink">SHOP</a></li>
                                <li><a href="#" className="navLink">BLOG</a></li>
                                <li><a href="#" className="navLink">CONTACT</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Weather Section */}
                    <div className="weatherSection position-absolute">
                        <span id="weatherImage"></span><span id="temperature"></span>
                    </div>
                </div>

                {/* Bootstrap 5 OffCanvas Section End (Visible Only in Medium Devices) */}
                <div className="offcanvas offcanvas-end menuOffcanvas" tabIndex="-1" id="ResponsiveMenu" aria-labelledby="ResponsiveMenuLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="ResponsiveMenuLabel"></h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body resMenuSection">
                        <form className="d-flex">
                            <input className="form-control" type="search" placeholder="Search Products" aria-label="Search" />
                            <button type="button" className="btn primaryBtn"><i className="fas fa-search"></i></button>
                        </form>

                        <span className="resNavLink" id="opencategories" onClick={this.openCategories}>ALL CATEGORIES <i className="fas fa-angle-down"></i></span>

                        <div className="resCategoryDropdown" id="collapsableCategory">
                            <Link to="/listing/1"><i className="fas fa-mobile-alt categoryIcons"></i> Mobiles</Link>
                            <Link to="/listing/2"><i className="fas fa-tv categoryIcons"></i> Televisions</Link>
                            <Link to="/listing/3"><i className="fas fa-laptop categoryIcons"></i> Laptops</Link>
                            <Link to="/listing/4"><i className="fas fa-camera categoryIcons"></i> Cameras</Link>
                            <Link to="/listing/5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-smartwatch categoryIcons" viewBox="0 0 16 16">
                                    <path d="M9 5a.5.5 0 0 0-1 0v3H6a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 .5-.5V5z" />
                                    <path d="M4 1.667v.383A2.5 2.5 0 0 0 2 4.5v7a2.5 2.5 0 0 0 2 2.45v.383C4 15.253 4.746 16 5.667 16h4.666c.92 0 1.667-.746 1.667-1.667v-.383a2.5 2.5 0 0 0 2-2.45V8h.5a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5H14v-.5a2.5 2.5 0 0 0-2-2.45v-.383C12 .747 11.254 0 10.333 0H5.667C4.747 0 4 .746 4 1.667zM4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3z" />
                                </svg>
                                SmartWatches
                            </Link>
                            <Link to="/listing/6"><i className="fas fa-headphones categoryIcons"></i> Accesories</Link>
                        </div>

                        <a href="product_list.html" className="resNavLink">SHOP <i className="fas fa-angle-right"></i></a>
                        <Link to="/user/login" className="resNavLink">MY ACCOUNT <i className="fas fa-angle-right"></i></Link>
                        <Link to="/user/cart" className="resNavLink">CART <i className="fas fa-angle-right"></i></Link>
                        <Link to="/user/wishlist" className="resNavLink">WISHLIST <i className="fas fa-angle-right"></i></Link>
                        <Link to="/" className="resNavLink">BLOG <i className="fas fa-angle-right"></i></Link>
                        <Link to="/" className="resNavLink">CONTACT <i className="fas fa-angle-right"></i></Link>

                        <div className="canvasFooter mt-0">
                            <div className="currencySelectContainer">
                                <select className="currencySelect">
                                    <option value="rs">RS - ₹</option>
                                    <option value="usd">USD - $</option>
                                    <option value="eur">EUR - €</option>
                                </select>
                                <span><i className="fas fa-sort-down"></i></span>
                            </div>
                            <div>
                                {/* Extra Buttons */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        // To ask Permission for Geolocation
        window.addEventListener('load', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            } else {
                console.log('Geolocation is Not Supported on this Device');
            }
        })

        // Api to get userInfo if Logged in
        if(sessionStorage.getItem('loginStatus') == 'LoggedIn' && this.state.userData == ''){
            fetch(userInfoURL, {
                method: 'GET',
                headers: {
                    'x-access-token': sessionStorage.getItem('ltk')
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({ userData: data });
                })
        }
    }
}

export default withRouter(Header);