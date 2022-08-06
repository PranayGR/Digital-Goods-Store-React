import React, { Component } from 'react';

const brandURL = "https://digital-box-api.herokuapp.com/brand";
const brandFilterURL ="https://digital-box-api.herokuapp.com/filter/";

class BrandFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            brandData: ''
        }
    }

    brandFilter = (event) => {
        let brandId = event.target.value;
        let categoryId = this.props.categoryId;
        let newBrandFilterURL = "";
        if(brandId === ""){
            newBrandFilterURL = `${brandFilterURL}${categoryId}`;
        } else{
            newBrandFilterURL = `${brandFilterURL}${categoryId}?brand=${brandId}`
        }

        fetch(newBrandFilterURL,{ method:'GET'})
        .then((res) => res.json())
        .then((data) =>{
            this.props.productPerBrand(data);
        })
    }

    showBrands = (brandData) => {
        if (brandData) {
            return brandData.map((brand,index) => {
                if(brand.category_id == this.props.categoryId){
                    return (
                        <div className="form-check" key={brand.id}>
                            <input type="radio" value={brand.id} className="form-check-input" id={`brand${index}`} name="category" />
                            <label className="form-check-label" htmlFor={`brand${index}`}>{brand.name}</label>
                        </div>
                    )
                }
            })
        }
    }

    render() {
        return (
            <div onChange={this.brandFilter}>
                {this.showBrands(this.state.brandData)}
            </div>
        )
    }

    componentDidMount() {
        fetch(brandURL, { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ brandData: data });
            })
    }
}

export default BrandFilter;