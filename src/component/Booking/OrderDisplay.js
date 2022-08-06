import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const OrderDisplay = (props) => {  

    const renderTable = ({orderData}) => {
        if(orderData){
            return orderData.map((item) =>{
                return(
                    <tr key={item.orderId}>  
                        <td>{item.orderId}</td>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>Rs. {item.cost}</td>
                        <td>{item.address}</td>
                        <td>{item.city}</td>
                        <td>{item.pincode}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        <td>{item.bank}</td>
                    </tr>
                )
            })
        }
    }

    useForceUpdate();

    return(
        <div className="container-fluid">
            <h3 style={{textAlign:'center'}}>YOUR ORDERS</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>OrderId</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Cost</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Pincode</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>BankName</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
        </div>   
    )
}

export default withRouter(OrderDisplay);