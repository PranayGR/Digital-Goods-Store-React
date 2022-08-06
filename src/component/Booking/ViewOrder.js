import React, { Component } from 'react';
import OrderDisplay from './OrderDisplay';
import Header from '../Header';

const orderURL = 'https://digital-box-api.herokuapp.com/orders'
const updateOrderURL = 'https://digital-box-api.herokuapp.com/updateOrder';

class ViewOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: ''
        }
    }

    render() {
        setTimeout(() =>{ 
            this.forceUpdate();
        },5000)
        if (sessionStorage.getItem('loginStatus') === 'LoggedIn') {
            return (
                <>
                    <Header />
                    <OrderDisplay orderData={this.state.orders} />
                </>
            )
        } else {
            return (
                <>
                    <Header />
                    <h2>Login First to View Order</h2>
                </>
            )
        }
    }

    componentDidMount() {
        let email = JSON.parse(sessionStorage.getItem('userInfo'))[2];
        if (email) {
            setTimeout(() => {
                fetch(`${orderURL}?email=${email}`, { method: 'GET' })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({ orders: data })
                    })
            }, 500)
        }
    }

    componentDidUpdate() {
        if(this.props.location.search) {
            var bankInfo = {
                status: this.props.location.search.split('&')[0].split('=')[1],
                orderId: this.props.location.search.split('&')[1].split('=')[1].split('_')[1],
                date: this.props.location.search.split('&')[2].split('=')[1].split('%')[0],
                bank: `${this.props.location.search.split('&')[3].split('=')[1].split('%20')[0]} ${this.props.location.search.split('&')[3].split('=')[1].split('%20')[1]}`
            }
            if (this.state.orders) {
                let orders = this.state.orders
                let newOrder = orders.filter((item) => {
                    return item.orderId == bankInfo.orderId;
                })
                fetch(`${updateOrderURL}/${newOrder[0]._id}`, {
                    method: 'PUT',
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bankInfo)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        this.setState({ orders: data });
                    })
            }
        }


    }

}

export default ViewOrder;