import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const WishlistURL = "https://digital-box-api.herokuapp.com/wishlist";

class Wishlist extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wishlistItems: ''
        }
    }

    wishlistItem = JSON.parse(localStorage.getItem('wishlist'));

    showWishlistCard = (wishlistItems) => {
        if (wishlistItems) {
            return wishlistItems.map((item) => {
                return (
                    <Link to={`/details/${item.id}`} key={item.id}>
                        <div className="favProductCard card">
                            <img src={item.img1} className="" alt={item.name} />
                            <div className="card-body">
                                <h6 className="card-title">{item.description}</h6>
                                <p className="card-text"><span className="currencySymbol">&#8377;</span> <span className="price">{item.pricing}</span></p>
                            </div>
                            <div className="wishlistBtn d-flex justify-content-center align-items-center"><i className="fas fa-heart"></i>
                            </div>
                        </div>
                    </Link>
                )
            })
        } else {
            return (
                <>
                    <img src="/images/wishlist-loading.gif" className="wishlistLoading" alt="Wishlist Loading" />
                </>
            )
        }
    }

    render() {
        return (
            <div className="wishlistSection">
                <h3>FAVOURITES</h3>
                <div className="favProducts">
                    {this.showWishlistCard(this.state.wishlistItems)}

                </div>
            </div>
        )
    }

    componentDidMount() {
        document.title = "DigitalBox | My Wishlist";
        if (this.wishlistItem != null && this.wishlistItem.length > 0) {
            fetch(WishlistURL, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.wishlistItem)
            })
                .then(res => res.json())
                .then((data) => {
                    this.setState({ wishlistItems: data });
                })
        }
    }
}

export default Wishlist;