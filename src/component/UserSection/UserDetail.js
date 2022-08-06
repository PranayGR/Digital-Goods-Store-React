import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserDetail extends Component {
    constructor(props) {
        super(props);

    }

    userArray = JSON.parse(sessionStorage.getItem('userInfo'));

    handleLogOut = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('ltk');
        sessionStorage.setItem('loginStatus', 'LoggedOut');
        this.setState({ userData: '' });
        this.props.history.push('/');
    }


    render() {
        console.log(this.userArray)
        return (
            <>
                <div className="mt-3">
                    <img src="https://i.ibb.co/yBwtzKK/male-avatar.png" className="avatarImg mx-auto" alt="AvatarImage" />
                    <p className="userName text-center mt-2">{this.userArray[0]} {this.userArray[1]}</p>
                    <p className="userRole text-muted text-center">{this.userArray[4]}</p>

                    <p className="userEmail ms-5"><i className="fas fa-envelope"></i> &nbsp; &nbsp; {this.userArray[2]}</p>
                    <p className="userEmail ms-5"><i className="fas fa-phone-alt"></i> &nbsp; &nbsp; {this.userArray[3]}</p>
                </div>
                <div className="d-flex justify-content-around">
                    <Link to='/viewBooking' class="btn btn-primary">View Orders</Link>
                    <button type="button" className="btn btn-danger" onClick={this.handleLogOut}>Logout</button>
                </div>
            </>
        )
    }
}

export default UserDetail;