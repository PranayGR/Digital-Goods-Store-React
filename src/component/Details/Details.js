import React, { Component } from 'react';
import Header from '../Header';
import './Details.css';

const productDetailURL = "https://digital-box-api.herokuapp.com/productDetails/";
// const brandURL = "https://digital-box-api.herokuapp.com/brand";

class Details extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productData: ''
        }
    }

    loginStatus = sessionStorage.getItem('loginStatus');
    orderItemId = [];

    proceed = () => {
        this.orderItemId.push(this.state.productData.id);
        if (this.loginStatus == 'LoggedIn') {
            sessionStorage.setItem('orderItems', JSON.stringify(this.orderItemId));
            this.props.history.push(`/placeOrder`);
        } else {
            sessionStorage.setItem('currentOrderId', this.state.productData.id);
            this.props.history.push('/user/login');
        }
    }

    showProductDetail = (product) => {
        let discount = Math.floor(Math.random() * (20 - 5) + 5);
        let mrpPrice = parseInt((product.pricing) * ((100 - discount) / 100));
        let savingPrice = (product.pricing) - mrpPrice;

        if (product) {
            return (
                <div className="row">
                    <div className="col-lg-5 productSlider d-flex justify-content-center">
                        <img src={product.img1} alt={product.name} className="productImg" />
                    </div>
                    <div className="col-lg-7 productDetail">
                        <p className="text-muted">Product ID: {product._id}</p>
                        <h5>{product.description}</h5>
                        <h6 className="text-muted productBrand">Apple</h6>
                        <div className="detailSection row">
                            <div className="productDesc col-md-6">
                                <p style={{ fontSize: '17px', fontWeight: 'bold' }}>About this Product</p>
                                <p style={{ fontSize: '14px' }}>{product.summary}</p>
                            </div>
                            <div className="pricingSection col-md-6">
                                <h4>&#8377; <span className="price">{product.pricing}</span></h4>
                                <p>MRP: <strike><strong>&#8377;{mrpPrice}</strong></strike> <small style={{ fontSize: '12px' }}>(Inclusive of all taxes)</small></p>
                                <p className="text-success fw-bold discount">You Save: {discount}%(&#8377; {savingPrice})</p>
                                <img src="https://i.ibb.co/1MG62yh/delivery.png" alt="Free Delivery" />
                                <img src="https://i.ibb.co/zN9WcB1/guarantee1.png" alt="Guarantee" style={{ width: ' 70px' }} />
                                <form>
                                    <label htmlFor="buyingPincode">Pin Code</label>
                                    <input type="number" className="form-control" placeholder="" id="buyingPincode" name="pincode"/>
                                    <div className="d-flex justify-content-md-between">
                                        <button className="btn btn-danger cartBtn">Add to Cart</button>
                                        <button className="btn btn-success buyBtn ms-1" onClick={this.proceed}>Buy Now</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <img src="/images/detail-loading.gif" className="detailLoading" alt="loading" />
            )
        }
    }

    render() {
        let product = this.state.productData;
        return (
            <>
                <Header />
                <div className="container-fluid mb-5 position-relative productDetailContainer">
                    {this.showProductDetail(product)}
                </div>
            </>
        )
    }

    componentDidMount() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        sessionStorage.removeItem('currentOrderId');
        let productId = this.props.match.params.productId;
        fetch(`${productDetailURL}${productId}`, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ productData: data[0] })
                document.title = `DigitalBox | ${data[0].description}`
            })
    }
}

export default Details;