import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const cartURL = "https://digital-box-api.herokuapp.com/cart";
var orderItems = [];
var newOrderItems = [];


class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cartData: '',
            quantity: 1,
            selected: 0,
        }
    }

    removeFromCart = (id) => {
        let cartItems = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i] == id) {
                cartItems.splice(i, 1);
                sessionStorage.setItem('cart', JSON.stringify(cartItems));
            }
        }
    }

    renderCartItems = (data) => {
        if (data) {
            if (data.length > 0) {
                if (orderItems != null) {
                    return data.map((item) => {
                        if (orderItems.includes(item.id) === true) {
                            var count = {};
                            orderItems.forEach((id) => {
                                count[id] = (count[id] || 0) + 1;
                            })
                            console.log(count);
                            return (
                                <div className="cartProductCard card mb-3" style={{ maxWidth: '100%' }} key={item.id}>
                                    <div className="row g-0">
                                        <div className="col-md-4 d-flex justify-content-center">
                                            <img src={item.img1} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h6 className="card-title d-flex justify-content-between align-items-center">{item.description}</h6>
                                                <p className="cartPrice"><span className="currencySymbol">&#8377;</span> <span className="price">{item.pricing}</span></p>
                                                <div className="card-text">
                                                    <button className="cartMinusBtn" onClick={() => { this.cartMinusProduct(item.id) }}><i className="fas fa-minus"></i></button><span className="cartQuantity"> {count[item.id]} </span><button className="cartPlusBtn" onClick={() => { this.cartPlusProduct(item.id) }}><i className="fas fa-plus"></i></button>
                                                </div>
                                                <button className="cartRemoveBtn" onClick={() => { this.removeFromCart() }}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else if (orderItems.includes(item.id) === false) {
                            return (
                                <div className="cartProductCard card mb-3" style={{ maxWidth: '100%' }} key={item.id}>
                                    <div className="row g-0">
                                        <div className="col-md-4 d-flex justify-content-center">
                                            <img src={item.img1} className="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h6 className="card-title d-flex justify-content-between align-items-center">{item.description}</h6>
                                                <p className="cartPrice"><span className="currencySymbol">&#8377;</span> <span className="price">{item.pricing}</span></p>
                                                <div className="card-text">
                                                    <button className="cartMinusBtn" onClick={() => { this.cartMinusProduct(item.id) }}><i className="fas fa-minus"></i></button><span className="cartQuantity"> 0 </span><button className="cartPlusBtn" onClick={() => { this.cartPlusProduct(item.id) }}><i className="fas fa-plus"></i></button>

                                                </div>
                                                <button className="cartRemoveBtn" onClick={() => { this.removeFromCart() }}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                } else {
                    return data.map((item) => {
                        return (
                            <div className="cartProductCard card mb-3" style={{ maxWidth: '100%' }} key={item.id}>
                                <div className="row g-0">
                                    <div className="col-md-4 d-flex justify-content-center">
                                        <img src={item.img1} className="img-fluid rounded-start" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h6 className="card-title d-flex justify-content-between align-items-center">{item.description}</h6>
                                            <p className="cartPrice"><span className="currencySymbol">&#8377;</span> <span className="price">{item.pricing}</span></p>
                                            <div className="card-text">
                                                <button className="cartMinusBtn" onClick={() => { this.cartMinusProduct(item.id) }}><i className="fas fa-minus"></i></button><span className="cartQuantity"> 0 </span><button className="cartPlusBtn" onClick={() => { this.cartPlusProduct(item.id) }}><i className="fas fa-plus"></i></button>

                                            </div>
                                            <button className="cartRemoveBtn" onClick={() => { this.removeFromCart() }}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            } else {
                return (
                    <>
                        No Item Added to Cart
                    </>
                )
            }

        } else {
            return (
                <img src="/images/cart-loading.gif" alt="cartLoading" className="cartLoading" />
            )
        }
    }

    cartPlusProduct = (id) => {
        orderItems.push(id);
        sessionStorage.setItem('orderItems', JSON.stringify(orderItems));
        if (orderItems) {
            for (let i = 0; i < orderItems.length; i++) {
                if (newOrderItems.indexOf(orderItems[i]) == -1) {
                    newOrderItems.push(orderItems[i]);
                }
            }
            this.setState({selected: newOrderItems.length});
            document.querySelector('.cartProceedSection').style.visibility = 'visible';
        }
        this.forceUpdate();
    }

    cartMinusProduct = (id) => {
        if (orderItems.indexOf(id) > -1) {
            orderItems.splice(orderItems.indexOf(id), 1);
            newOrderItems.splice(newOrderItems.indexOf(id))
        }
        sessionStorage.setItem('orderItems', JSON.stringify(orderItems));
        if (orderItems) {
            for (let i = 0; i < orderItems.length; i++) {
                if (newOrderItems.indexOf(orderItems[i]) == -1) {
                    newOrderItems.push(orderItems[i]);
                }
            }
            this.setState({selected: newOrderItems.length});
            if (this.state.selected === 0) {
                document.querySelector('.cartProceedSection').style.visibility = 'hidden';
            }
        }
        this.forceUpdate();
    }

    if (orderItems) {
        for (let i = 0; i < orderItems.length; i++) {
            if (newOrderItems.indexOf(orderItems[i]) == -1) {
                newOrderItems.push(orderItems[i]);
            }
        }
        document.querySelector('.cartProceedSection').style.visibility = 'visible';
    }

    render() {
        return (
            <div className="cartSection position-relative">
                <h3>CART</h3>
                <div className="cartProducts position-relative">
                    {this.renderCartItems(this.state.cartData)}
                </div>
                <div className="cartProceedSection d-flex justify-content-between align-items-center"><span className="cartProceedItemsText ps-2">{this.state.selected} Item Selected</span><Link to="/placeOrder" className="cartProcedButton me-3">PROCEED</Link></div>

            </div>
        )
    }

    componentDidMount() {
        document.title = "DigitalBox | My Cart";
        if (JSON.parse(sessionStorage.getItem('orderItems')) != null) {
            orderItems = JSON.parse(sessionStorage.getItem('orderItems'));
        } else {
            sessionStorage.setItem('orderItems', JSON.stringify(orderItems));
        }

        let cartItems = localStorage.getItem('cart');
        let cartId = [];
        if (cartItems != null) {
            cartItems.split(',').map((item) => {
                cartId.push(parseInt(item));
                return 'ok';
            })
        } else {

        }
        fetch(cartURL, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartId)
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ cartData: data });
            })
    }
}

export default Cart;