import React,{Component} from 'react';
import{BrowserRouter, Route} from 'react-router-dom';
import Footer from './Footer';
import Home from './Home/Home';
import Listing from './Listing/Listing';
import Details from './Details/Details';
import UserSection from './UserSection/UserSection';
import PlaceOrder from  './Booking/placeOrder';
import ViewOrder from './Booking/ViewOrder';

class Routing extends Component{
    render() {
        return (
            <BrowserRouter>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/listing/:categoryId" component={Listing}></Route>
                <Route exact path="/details/:productId" component={Details}></Route>
                <Route exact path="/user/:userPage" component={UserSection}></Route>
                <Route exact path="/placeOrder" component={PlaceOrder}></Route>
                <Route exact path="/viewBooking" component={ViewOrder}></Route>
                <Footer/>
            </BrowserRouter>
        )
    }
}

export default Routing;