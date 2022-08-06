import React, { Component } from 'react';

const categoryURL = "https://digital-box-api.herokuapp.com/category";
const categoryFilterURL = "https://digital-box-api.herokuapp.com/filter/";

class CategoryFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: ''
        }
    }

    filterCategory = (event) => {
        let category = event.target.value;
        fetch(`${categoryFilterURL}${category}`,{ method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.props.productPerCategory(data);
        })
    }

    showCategories = (category) => {
        if (category) {
            return category.map((category, index) => {
                return (
                    <div className="form-check" key={category.id}>
                        <input type="radio" value={category.id} className="form-check-input" id={`category${index}`} name="category" />
                        <label className="form-check-label" htmlFor={`category${index}`}>{category.name}</label>
                    </div>
                )
            })
        }

    }

    render() {
        return (
            <>
                <div onChange={this.filterCategory}>
                    {this.showCategories(this.state.category)}
                </div>
            </>
        )
    }

    componentDidMount() {
        fetch(categoryURL)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ category: data });
            })
    }
}

export default CategoryFilter;