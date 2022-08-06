import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

const RegisterURL = "https://digital-box-login-api.herokuapp.com/api/auth/register";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            cpassword:'',
            message:''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = () => {
        if(this.state.cpassword == this.state.password) {
            fetch(RegisterURL, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
            })
                .then(this.props.history.push('/'))
        } else{
            this.setState({message: 'Password Does Not Match'})
        }
    }

    render() {
        return (
            <div className="accountSection">
                <div className="register" id="register">
                    <h3>REGISTER</h3>
                    <h6 className="text-center">{this.state.message}</h6>
                    <form>
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" placeholder="" id="first_name" name="firstName" onChange={this.handleChange} />

                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" placeholder="" id="last_name" name="lastName" onChange={this.handleChange} />

                        <label htmlFor="register_email">Email</label>
                        <input type="email" className="form-control" placeholder="" id="register_email" name="email" onChange={this.handleChange} />

                        <label htmlFor="register_password">Password</label>
                        <input type="password" className="form-control" placeholder="" id="register_password" name="password" onChange={this.handleChange} />

                        <label htmlFor="confirm_pass">Confirm Password</label>
                        <input type="text" className="form-control" placeholder="" id="confirm_pass" name="cpassword" onChange={this.handleChange} />

                        <label htmlFor="mobile_no">Mobile Number</label>
                        <input type="text" className="form-control" placeholder="" id="mobile_no" name="phone" onChange={this.handleChange} />

                        <button type="button" className="btn primaryBtn registerBtn" onClick={this.handleSubmit}>REGISTER</button>
                    </form>
                    <p>Already Register?<span><Link to="/user/login" style={{ color: '#D9525E' }}> LOGIN</Link></span></p>
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.title = "DigitalBox | Register";
    }
}

export default withRouter(Register);