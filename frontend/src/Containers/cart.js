import { Container, Button,Table } from "react-bootstrap";
import React, { Component } from "react";
import {fetchCart} from '../Store/actions/cart';
import { connect } from 'react-redux';

class Cart extends Component {
    constructor(props){
      super(props);
      this.state = {
        products:['']
      }
    }
  //GET ITEMS IN CART TO STATE
   componentDidMount(){
         this.props.fetchCart()        
    }

    getAmountSum(arr) {
      let total =0;
      for(var i in arr) {
        total += arr[i]
      }
      return total
    }

    async removeFromCart(id){
          const oldProducts = localStorage.getItem("cart");
          const oldProductsArray = JSON.parse(oldProducts);
          const newArr = await oldProductsArray.map(products => products).filter(product => product.id !== id);
          localStorage.setItem('cart', JSON.stringify(newArr));
    }
    render(){
      const products = this.props.cart;
      const total =products !== null ? products.map(p => parseInt(p.amount) * parseInt(p.quantity)): 0
      const totalAmount = this.getAmountSum(total)
      const currentUser = this.props.currentUser
      return(
          <Container>
            {this.props.currentUser.isAuthenticated ? (
              <Container> 
                {products !== null? (
                  <div>
                       <Table className="table-borderless">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Amount(per Item)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.cart.map((product, index) => (
                        <tr key={index}>
                          <td key={1}>{product.name}</td>
                          <td key={2}>{product.quantity}</td>
                          <td key={3}>{product.amount}</td>
                          <td key="4"><Button 
                            onClick={() => { this.removeFromCart(product.id)}}
                            style={{backgroundColor:"red", padding:"0px 4px"}}>X</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <h5>Total Due Now: {totalAmount}</h5>
                  <a  className="btn" href={`/user/${currentUser.user.id}/checkout`}>Proceed to Checkout</a>
                  </div>
                ):<div>
                  <p className="display-5"><span className="display-4">O</span>oops!</p>
                  <p className="display-5">You have no item in your cart</p>
                  <a className="btn" href="/products">Click Here To go back to products</a>
                </div> }  
              </Container>
            ) : <Container>
                <p className="display-5"> Ooops You are not Logged In</p>
                <h5>Please Click <a href="/signin">Here</a> To Sign In</h5>
              </Container>}
          </Container>
      )
    }
}
function mapStateToProps(state){ 
  return{
      cart:state.cart
  }
}

export default connect(mapStateToProps, { fetchCart })(Cart)