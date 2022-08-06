import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

const LoginURL = "https://digital-box-login-api.herokuapp.com/api/auth/login";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '@gmail.com',
            password: '',
            loading: false
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = () => {

        this.setState({loading: true})
        fetch(LoginURL, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({loading: false});
                if (data.auth === false) {
                    this.props.message(data.token);
                } else {
                    sessionStorage.setItem('ltk', data.token);
                    sessionStorage.setItem('loginStatus', 'LoggedIn');
                    if (sessionStorage.getItem('currentOrderId') != null) {
                        this.props.history.push(`/details/${sessionStorage.getItem('currentOrderId')}`)
                    } else {
                        this.props.history.push('/');
                    }
                }
            })
    }

    render() {
        if(this.state.loading === true) {
            return(
                <div className="accountSection">
                    <img src="/images/login-loading.gif" style={{width: '100%', height: '100%'}} alt="Logging In .."/>
                </div>
            )
        } else{
            return (
                <>
                    <div className="accountSection">
                        <div className="login" id="login">
                            <h3>LOGIN</h3>
                            <form>
                                <label htmlFor="login_email">Email</label>
                                <input type="email" className="form-control" placeholder="abc@xyz.com" id="login_email" name="email" onChange={this.handleChange} value={this.state.email} />
    
                                <label htmlFor="login_password">Password</label>
                                <input type="password" className="form-control" placeholder="***********" id="login_password" name="password" onChange={this.handleChange} />
    
                                <button type="button" className="btn primaryBtn loginBtn" onClick={this.handleSubmit}>LOGIN</button>
                            </form>
                            <p>Don't Have an Account Yet?<span><Link to="/user/register" style={{ color: '#D9525E' }}> REGISTER</Link></span></p>
                        </div>
                    </div>
                </>
            )
        }
    }

    componentDidMount() {
        document.title = "DigitalBox | Login";
    }
}

export default withRouter(Login);