import React, { Component } from 'react';
import Header from '../Header';
import './placeOrder.css';

const ProductURL = "https://digital-box-api.herokuapp.com/products";
const placeOrderURL = "https://digital-box-api.herokuapp.com/PlaceOrder";

let userData = JSON.parse(sessionStorage.getItem('userInfo'));


class PlaceOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prodData: '',
            quantity: '1',
            id: Math.floor(Math.random() * 1000000),
            firstName: userData ? userData[0] : '',
            lastName: userData ? userData[1] : '',
            email: userData ? userData[2] : '@gmail.com',
            phone: userData ? userData[3] : '',
            cost: 0,
            address: '',
            city: '',
            pincode: '',
            message: ''
        }
    }

    orderItems = JSON.parse(sessionStorage.getItem('orderItems'));
    newOrderItems = [];
    id = 1;
    siteName = "DigitalBox";

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.style.borderColor == 'red') {
            event.target.style.borderColor = '#1774EF';
        }
    }

    renderBagProducts = (products) => {
        if (products) {
            return products.map((product) => {
                if (this.orderItems.length > 0) {
                    for (let i = 0; i < this.orderItems.length; i++) {
                        if (this.newOrderItems.indexOf(this.orderItems[i]) == -1) {
                            this.newOrderItems.push(this.orderItems[i]);
                        }
                    }
                    for (let i = 0; i < this.newOrderItems.length; i++) {
                        if (product.id == this.newOrderItems[i]) {
                            if (this.orderItems.includes(product.id) === true) {
                                let count = {};
                                this.orderItems.forEach((id) => {
                                    count[id] = (count[id] || 0) + 1;
                                })
                                return (
                                    <div className="card mb-3 col-5" key={product.id}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={product.img1} className="img-fluid rounded-start" alt={product.name} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h6 className="card-title">{product.description}</h6>
                                                    {/* <p className="card-text" style={{ height: '65px', overflow: 'hidden' }}>{product.summary}</p> */}
                                                    <p className="card-text text-muted" style={{ fontWeight: 'bold', fontSize: '18px' }}>₹ {product.pricing}</p>
                                                    <button className="cartMinusBtn" onClick={() => { this.cartMinusProduct(item.id) }}><i className="fas fa-minus"></i></button><span className="cartQuantity"> {count[product.id]} </span><button className="cartPlusBtn" onClick={() => { this.cartPlusProduct(item.id) }}><i className="fas fa-plus"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    }
                } else {
                    return (
                        <>No Item Selected</>
                    )
                }
            })
        }
    }

    sendOrderDetails = (event) => {
        let details = this.state
        if (!details.id || !details.firstName || !details.lastName || !details.email || !details.phone || !details.pincode || !details.address || !details.city) {
            event.preventDefault();
            this.setState({ message: "Some Fields Are Required Filling" });
            if (!details.firstName) {
                document.getElementById('billingFirstName').style.borderColor = "red";
            }
            if (!details.lastName) {
                document.getElementById('billingLastName').style.borderColor = "red";
            }
            if (!details.email) {
                document.getElementById('billingEmail').style.borderColor = "red";
            }
            if (!details.phone) {
                document.getElementById('billingPhone').style.borderColor = "red";
            }
            if (!details.pincode) {
                document.getElementById('billingPinCode').style.borderColor = "red";
            }
            if (!details.address) {
                document.getElementById('billingAddress').style.borderColor = "red";
            }
            if (!details.city) {
                document.getElementById('billingCity').style.borderColor = "red";
            }
        } else {
            let orderDetails = {
                orderId: details.id,
                orderItems: this.orderItems,
                firstName: details.firstName,
                lastName: details.lastName,
                email: details.email,
                phone: details.phone,
                city: details.city,
                pincode: details.pincode,
                address: details.address,
                cost: details.cost,
                status: 'Pending'
            };
            fetch(placeOrderURL, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            })
                .then(this.setState({ message: 'Order Placed Successfully!' }))
        }
    }

    showMessage = (message) => {
        if (message) {
            return (
                <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ marginTop: '-20px' }}>
                    <strong />{message}<strong />
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )
        }

    }

    showFullPrice = (products) => {
        this.state.cost = 0;
        if (products) {
            let count = {};
            this.orderItems.forEach((id) => {
                count[id] = (count[id] || 0) + 1;
            })
            for (let quantity in count) {
                return products.map((product) => {
                    if (product.id == quantity) {
                        this.state.cost = this.state.cost + (Number(product.pricing) * count[quantity]);
                        return (
                            <>
                                <span key={product.id}>{this.state.cost}</span>
                            </>
                        )
                    }
                })
            }
        }
    }

    render() {
        // setTimeout(() => {
        //     this.forceUpdate();
        // }, 1000)
        return (
            <>
                <Header />
                <div className="orderPage">
                    {this.showMessage(this.state.message)}
                    <div className="container d-flex justify-content-between">
                        <div className="billingForm p-5">
                            <h3>BILLING DETAILS</h3>
                            <div className="row g-3 mb-5">
                                <div className="col-12">
                                    <label htmlFor="billingEmail" className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="mail@gmail.com" id="billingEmail" aria-label="Email" defaultValue={this.state.email} name="email" onChange={this.handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="billingFirstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" placeholder="First name" id="billingFirstName" aria-label="First name" defaultValue={this.state.firstName} name="firstName" onChange={this.handleChange} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="billingLastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" placeholder="Last name" id="billingLastName" aria-label="Last name" defaultValue={this.state.lastName} name="lastName" onChange={this.handleChange} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="billingAddress" className="form-label">Address</label>
                                    <input type="text" className="form-control" placeholder="1234 Main Street" id="billingAddress" aria-label="Address" name="address" onChange={this.handleChange} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="billingCity" className="form-label">City</label>
                                    <input type="text" className="form-control" placeholder="City" id="billingCity" aria-label="city" name="city" onChange={this.handleChange} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="billingPinCode" className="form-label">Pincode</label>
                                    <input type="text" className="form-control" placeholder="Pincode" id="billingPinCode" aria-label="pincode" name="pincode" onChange={this.handleChange} />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="billingPhone" className="form-label">Phone</label>
                                    <input type="text" className="form-control" placeholder="Phone" aria-label="phone" id="billingPhone" defaultValue={this.state.phone} name="phone" onChange={this.handleChange} />
                                </div>
                            </div>

                            <h3>MY BAG</h3>
                            <div className="row justify-content-around">
                                {this.renderBagProducts(this.state.prodData)}
                            </div>
                        </div>
                        <div className="orderContainer p-5">
                            <h3>MY ORDERS</h3>
                            {/* <p className="d-flex justify-content-between"><span style={{ fontSize: '18px' }}>Quantity:</span> {this.state.quantity}</p> */}
                            <p className="d-flex justify-content-between align-items-center"><span style={{ fontSize: '21px', fontWeight: 'bold' }}>Total</span> <span><small>(INR)</small><span style={{ fontSize: '21px', fontWeight: 'bold' }}> Rs.<span style={{ fontSize: '30px', fontWeight: 'bold' }}>{this.showFullPrice(this.state.prodData)}</span></span></span></p>
                            <form action="https://digitalbox-payment.herokuapp.com/paynow" method="POST">
                                <input type="hidden" name="cost" value={this.state.cost} />
                                <input type="hidden" name="id" value={this.state.id} />
                                <input type="hidden" name="name" value={this.state.firstName} />
                                <input type="hidden" name="prod_name" value={this.siteName} />
                                <input type="hidden" name="email" value={this.state.email} />
                                <input type="hidden" name="phone" value={this.state.phone} />
                                <button type="submit" className="btn btnOrder" onClick={(event) => { this.sendOrderDetails(event) }}>Continue <i className="fas fa-caret-right ms-3"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )

    }

    componentDidMount() {
        fetch(ProductURL, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ prodData: data })
            })
    }
}

export default PlaceOrder;