import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';
import Moment from 'react-moment';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:['']
        }
    }
    async componentDidMount(){
        const url = `http://localhost:3001/api/users/${this.props.currentUser.user.id}/products`;
        await axios.get(url)
        .then(data => data.data)
        .then(products => this.setState({products})) 
    }
    render(){
        const purchaseHistory = this.state.products
        const showHistory = purchaseHistory.map((p, i) => ( 
            <div key={i} className="personal-cart-history-single">
                <p key={p._id}> 
                    <strong>Cart Id:</strong> {p._id} 
                </p>

                <p>
                    {p.paid ? <span>paid:&#9989;</span> : <span>paid:&#10060;</span> }
                    {p.delivered ? <span>delivered:&#9989;</span> : <span>delivered:&#10060;</span> }
                </p>

                {  p.products && p.products.length > 0 ? p.products.map((p, i)=> (
                        <li key={i}>
                            <strong>Product</strong>{` ${p.name} `}
                            <strong>Price:</strong>{` ${p.amount} `} 
                            <strong>Quantity</strong>{` ${p.quantity} `}
                        </li>  
                )): null}

                <Moment className="text-muted" format="DD MM YYYY, HH:MM">{p.createdAt}</Moment>
            </div>
          ))
        const { currentUser } = this.props;
        return(
            <Container fluid> 
                
                <p className="display-5">Welcome {currentUser.user.firstname}! </p>
                <h5>Your Personal Dashboard</h5>
                <Container className="personal-dashboard">
                        <h5>Your Account Details</h5>
                        <p> <strong>Firstname:</strong>{currentUser.user.firstname}</p>
                        <p><strong>Surname:</strong> {currentUser.user.surname}</p>
                        <p><strong>Username:</strong>{currentUser.user.username}</p> 
                        <p><strong>Shipping Address:</strong></p>                 
                </Container>
                <h5>Your Purchase History</h5>
                <hr /> 
                <Row>
                    <Col xs={12} lg={12} className="personal-cart-history">
                        {showHistory}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default UserProfile;