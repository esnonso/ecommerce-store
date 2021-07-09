import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import {fetchCart} from '../Store/actions/cart';
import { connect } from 'react-redux';
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import axios from 'axios';

class Checkout extends Component {
        async componentDidMount(){
            await this.props.fetchCart()
            const products = this.props.cart;       
            const url = `http://localhost:3001/api/users/${this.props.currentUser.user.id}/cart`
             await axios.post(url, {
                products
            })
            .then(res => localStorage.removeItem("cart"))
        }

        getAmountSum(arr) {
            let total =0;
            for(var i in arr) {
              total += arr[i]
            }
            return total
          }
        render(){
                const products = this.props.cart;
                const total = products !== null ? products.map(p => parseInt(p.amount) * parseInt(p.quantity)): 0
                const totalAmount = this.getAmountSum(total)
            return(
               <Container>
                    <p className="display-5">Pay Total Now</p>
                    <p>Amount: {totalAmount} </p>
                    <p className="display-5">Select a payment system</p>
                    <a className="display-5 text-primary" href="/#"><FontAwesomeIcon icon={faPaypal}/>Paypal</a>
                    <p className="text-muted">No fee Applies</p>
                    <a className="display-5 text-primary" href="/">Cybernon Payment Portal</a>
                    <p className="text-muted">0.5% cashback on first two payments</p>
               </Container>
            )
        }
}

function mapStateToProps(state){ 
  return{
      cart:state.cart
  }
}

export default connect(mapStateToProps, { fetchCart})(Checkout);