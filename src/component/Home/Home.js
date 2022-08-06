import React,{Component} from 'react';
import Carousel from './Carousel';
import Category from './Category';
import DealSection from './DealSection';
import Coupon from './Coupon';
import ScrollTopBtn from '../ScrollTopBtn';
import Header from '../Header';

class Home extends Component {
    constructor(props) {
        super (props);

    }



    render() {
        return(
            <>
                <Header/>
                <Carousel/>
                <Category/>
                <DealSection/>
                <Coupon/>
                <ScrollTopBtn/>
            </>
        )
    }

    componentDidMount(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        document.title = "DigitalBox | Home";
    }
}

export default Home;