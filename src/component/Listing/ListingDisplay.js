import React from "react";
import { Link } from 'react-router-dom';
import './Listing.css';

class ListingDisplay extends React.Component {
    constructor(props) {
        super(props);

    }

    cartItem = JSON.parse(localStorage.getItem('cart'));
    wishlistItem = JSON.parse(localStorage.getItem('wishlist'));


    addToCart = (id) => {
        this.props.cartItems(id);
    }

    addToWislist = (id) => {
        this.props.wishlistItems(id);
    }
    
    removeFromWishlist = (id) => {
        this.props.removeItems(id);
    }

    showWishlistIcon = (id) =>{ 
        if(this.wishlistItem != null && this.wishlistItem.length > 0){
            if(this.wishlistItem.includes(id)){
                return(
                    <>
                        <i className="fas fa-heart"></i>
                    </>
                )
            } else{
                return(
                    <>
                        <i className="far fa-heart"></i>
                    </>
                )
            }
        } else{
            return(
                <>
                    <i className="far fa-heart"></i>
                </>
            )
        }
    }

    showCartIcon = (id) =>{ 
        if(this.cartItem != null && this.cartItem.length > 0){
            if(this.cartItem.includes(id)){
                return(
                    <>
                        Added
                    </>
                )
            } else{
                return(
                    <>
                        Add To Cart
                    </>
                )
            }
        } else{
            return(
                <>
                    Add To Cart
                </>
            )
        }
    }

    renderProducts = ({ productList }) => {
        if (productList) {
            if (productList.length > 0) {
                return productList.map((product) => {
                            return (
                                <div className="card" key={product.id}>
                                    <Link to={`/details/${product.id}`}><img src={product.img1} alt={product.name} /></Link>
                                    <div className="card-body">
                                        <Link to={`/details/${product.id}`}><h6 className="card-title">{product.description}</h6></Link>
                                        <p className="card-text">MRP: &#8377; <span className="price">{product.pricing}/-</span></p>
                                    </div>
                                    <div className="card-footer">
                                        <button className="cartBtn text-center" onClick={() => { this.addToCart(product.id) }}><i className="fas fa-shopping-cart"></i> {this.showCartIcon(product.id)}</button>
                                        <Link to={`/details/${product.id}`} className="btn viewBtn text-center"><i className="far fa-eye"></i> View</Link>
                                    </div>
                                    <div className="wishlistBtn d-flex justify-content-center align-items-center"
                                        onClick={(event) => {
                                            // To show make symbol fill
                                            if (event.target.classList.contains('far')) {
                                                event.target.classList.remove('far');
                                                event.target.classList.add('fas');
                                                this.addToWislist(product.id)
                                            } else if (event.target.classList.contains('fas')) {
                                                event.target.classList.remove('fas');
                                                event.target.classList.add('far');
                                                this.removeFromWishlist(product.id);
                                            }
                                        }}>
                                        {this.showWishlistIcon(product.id)}
                                    </div>
                                </div>
                            )
                        })
            } else {
                return (
                    <>
                        No Data Found
                    </>
                )
            }
        } else if(productList && this.wishlistItem){

        } else {
            if (this.props.categoryId == 1) {
                return (
                    <>
                        <img src="/images/mobile-loading.gif" alt="MobileLoading" className="loadingImg" />
                    </>
                )
            } else if (this.props.categoryId == 2) {
                return (
                    <>
                        <img src="/images/tv-loading.gif" alt="TVloading" className="loadingImg" />
                    </>
                )
            } else if (this.props.categoryId == 3) {
                return (
                    <>
                        <img src="/images/laptop-loading.gif" alt="laptopLoading" className="loadingImg" />
                    </>
                )
            } else if (this.props.categoryId == 4) {
                return (
                    <>
                        <img src="/images/camera-loading.gif" alt="cameraLoading" className="loadingImg" />
                    </>
                )
            } else if (this.props.categoryId == 5) {
                return (
                    <>
                        <img src="/images/smartwatch-loading.gif" alt="" className="loadingImg" />
                    </>
                )
            } else if (this.props.categoryId == 6) {
                return (
                    <>
                        <img src="/images/headphone-loading.gif" alt="" className="loadingImg" />
                    </>
                )
            }
        }
    }

    render() {
        return (
            <>
                {this.renderProducts(this.props)}
            </>
        )
    }
}

export default ListingDisplay;