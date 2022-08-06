import React, { Component } from 'react';
import ListingDisplay from './ListingDisplay';
import Header from '../Header';
import CategoryFilter from '../Filters/CategoryFilter';
import BrandFilter from '../Filters/BrandFilter';
import ScrollTopBtn from '../ScrollTopBtn';
import './Listing.css';

const categoryProductURL = "https://digital-box-api.herokuapp.com/filter/";

// To store Cart Local Srorage if not null in array
let cartItem = JSON.parse(localStorage.getItem('cart'));
if (cartItem == null) {
    var orderId = [];
} else {
    var orderId = cartItem;
}
let newOrderId = [];

// To store wislist Local Srorage if not null in array
let wishlistItem = JSON.parse(localStorage.getItem('wishlist'));
if (wishlistItem == null) {
    var wishlistItemId = [];
} else {
    var wishlistItemId = wishlistItem;
}
let newWishlistItemId = [];


class Listing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: '',
            categoryId: '',
            category: '',
            cartItems: '',
            // skipValue: '0',
            // limitValue: '12'
        };
    }

    setDataPerFilter = (data) => {
        this.setState({ products: data });
    }

    // To sort By Price
    sortFilter = (event) => {
        let sortValue = event.target.value;
        let categoryId = this.state.categoryId;
        let SortFilterURL = "";
        if (sortValue === "") {
            SortFilterURL = `${categoryProductURL}${categoryId}`;
        } else {
            SortFilterURL = `${categoryProductURL}${categoryId}?sort=${sortValue}`
        }

        fetch(SortFilterURL, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ products: data });
            })

    }

    // To send Cart Items to LocalStorage
    addItemToCart = (id) => {
        orderId.push(id);
        for (let j = 0; j < orderId.length; j++) {
            if (newOrderId.indexOf(orderId[j]) == -1) {
                newOrderId.push(orderId[j]);
            }
        }
        localStorage.setItem('cart', JSON.stringify(newOrderId));
    }

    // To send Wishlist Items to LocalStorage
    addItemToWislist = (id) => {
        wishlistItemId.push(id);
        // for (let j = 0; j < wishlistItemId.length; j++) {
        //     if (newWishlistItemId.indexOf(wishlistItemId[j]) == -1) {
        //         newWishlistItemId.push(wishlistItemId[j]);
        //     }
        // }
        localStorage.setItem('wishlist', JSON.stringify(wishlistItemId));
    }

    removeItemFromWishlist = (id) => {
        if (wishlistItemId.indexOf(id) > -1) {
            wishlistItemId.splice(wishlistItemId.indexOf(id), 1);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlistItemId))
    }

    ChangePage = (event) => {
        
    }

    render() {
        return (
            <>
                <Header />
                <div className="container-fluid listingContainer">
                    <div className="row">
                        <div className="col-lg-2 d-lg-block d-none filterSection pb-5">
                            <h4>FILTERS</h4>

                            {/* <div className="filterDiv">
                                <p className="filterTitle">Price</p>
                                <label htmlFor="customRange1" className="form-label">Example range</label>
                                <input type="range" className="form-range" id="customRange1" />
                            </div> */}

                            <div className="filterDiv">
                                <p className="filterTitle">Category</p>
                                <div id="categoryCheck">
                                    <CategoryFilter categoryId={this.state.categoryId} productPerCategory={(data) => { this.setDataPerFilter(data) }}/>
                                </div>
                            </div>

                            <div className="filterDiv">
                                <p className="filterTitle">Brands</p>
                                <div id="brandCheck">
                                    <BrandFilter categoryId={this.state.categoryId} productPerBrand={(data) => { this.setDataPerFilter(data) }} />
                                </div>
                                {/* <div className="text-center" id="seeMoreBtn">See More...</div> */}
                            </div>

                            {/* <div className="filterDiv">
                                <p className="filterTitle">Discount Percent</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="discount1" />
                                    <label className="form-check-label" htmlFor="discount1">
                                        60% or more
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="discount1" />
                                    <label className="form-check-label" htmlFor="discount1">
                                        40% to 60%
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="discount1" />
                                    <label className="form-check-label" htmlFor="discount1">
                                        20% to 30%
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="discount1" />
                                    <label className="form-check-label" htmlFor="discount1">
                                        10% to 20%
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="discount1" />
                                    <label className="form-check-label" htmlFor="discount1">
                                        upto 10%
                                    </label>
                                </div>
                            </div> */}
                        </div>

                        {/* Product List Section */}
                        <div className="col-lg-10 productListSection">
                            <div className="d-flex justify-content-between">
                                <h3 className="mt-3">SEARCH</h3>
                                <div className="d-flex mt-3">
                                    <select className="form-select form-select-sm productSortSelect me-3" defaultValue="DEFAULT" onChange={this.sortFilter}>
                                        <option value="DEFAULT" disabled>Sort By</option>
                                        <option value="1">Price: Low to High</option>
                                        <option value="-1">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>


                            {/* Product Cards */}
                            <div className="productCardSm row">
                                <ListingDisplay productList={this.state.products} 
                                                categoryId={this.state.categoryId} 
                                                cartItems={(data) => { this.addItemToCart(data)}} 
                                                wishlistItems={(data) => { this.addItemToWislist(data)}} 
                                                removeItems={(data) => {this.removeItemFromWishlist(data)}}/>
                            </div>

                            {/* <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                    </li>
                                    <li className="page-item"><button className="page-link">1</button></li>
                                    <li className="page-item"><button className="page-link" onClick={this.ChangePage}>2</button></li>
                                    <li className="page-item"><button className="page-link">3</button></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={this.setState({skipValue: (Number(this.state.skipValue) + 13).toString(), limitValue: (Number(this.statelimitValue) + 12).toString()})}>Next</a>
                                    </li>
                                </ul>
                            </nav> */}
                        </div>
                    </div>
                </div>
                <ScrollTopBtn />
            </>
        )
    }

    componentDidMount() {
        document.title = "DigitalBox | Listing"
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // Get Category Id to Pass on ListingDisplay
        let categoryId = this.props.match.params.categoryId;
        this.setState({ categoryId: categoryId })

        // Fetch Products from API
        fetch(`${categoryProductURL}${categoryId}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ products: data });
            })

        // See More Btn Functionlatity on Brand Filter
        // document.getElementById('seeMoreBtn').addEventListener('click', function () {
        //     let brandCont = document.getElementById('brandCheck');
        //     if (brandCont.style.height == 'auto') {
        //         brandCont.style.height = 'max(100%,115px)'
        //         brandCont.style.overflowY = 'hidden';
        //         document.getElementById('seeMoreBtn').innerText = 'See More ...'
        //     } else {
        //         brandCont.style.height = 'auto'
        //         brandCont.style.overflowY = 'auto';
        //         document.getElementById('seeMoreBtn').innerText = 'See Less ...'
        //     }
        // });
    }
}

export default Listing;