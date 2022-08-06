import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

const categoryURL = "https://digital-box-api.herokuapp.com/category";

class Category extends Component{
    constructor(props){
        super(props);

        this.state={
            category:''
        }
    }

    categoryDisplay = (category) => {
        if(category){
            return category.map((item) => {
                return (
                    <div className="col-lg-4 col-sm-6 text-center categoryImg" key={item.id}>
                        <Link to={`/listing/${item.id}`}>
                        <img src={item.categoryImg} alt={item.name}/>
                        <p>{item.name}</p>
                        </Link>
                    </div>
                )
            })
        }
    }

    render(){
        return(
            <>
                {/* Category Section */}
                <div className="container productSection"> 
                <h3 className="text-center categoryHeading">EXPLORE OUR RANGE OF PRODUCTS</h3>
                <div className="row mt-5">
                    {this.categoryDisplay(this.state.category)}
                </div>
                </div>
            </>
        )
    }

    componentDidMount() {
        fetch(categoryURL, {method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.setState({category: data});
        })
    }
}

export default Category;