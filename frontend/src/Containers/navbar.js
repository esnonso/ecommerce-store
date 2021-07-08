import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { fetchCart } from '../Store/actions/cart';
import { connect } from 'react-redux';
import { logout } from '../Store/actions/auth';

class NavbarComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSideBar:false
        }
        this.showSideBar = this.showSideBar.bind(this);
    }
    componentDidMount(){
        this.props.fetchCart()
    }

    logout = e => {
        e.preventDefault();
        this.props.logout()
    }

    showSideBar() {
        this.state.showSideBar ? this.setState({showSideBar:false}) : this.setState({showSideBar:true})
    }

    render(){
        const cart = this.props.cart
        const productInCart = cart !== null ? cart.length : 0;
        const currentUser = this.props.currentUser;
        const { showSideBar } = this.state;
        return(
            <div>
                <Navbar variant="light"  expand="lg">
                <button className="brand-button" onClick={this.showSideBar}>
                    &#9776;
                </button>
                <Navbar.Brand href="/"><FontAwesomeIcon icon={faShoppingCart} />ShopOnline<span className="logo-com">.com</span></Navbar.Brand>
               {currentUser.user.isAdmin ? (
                   <Nav>
                    <Nav.Link href="/products/add">Add New Product</Nav.Link>
                    <Nav.Link href="/admin">Admin Page</Nav.Link>
                    </Nav>
                    ): ""} 
               
                    <Nav.Link  href={`/user/${currentUser.user.id}/cart`} className="active text-dark ms-auto" >
                        <div className="cart-amount ms-auto">
                            {productInCart}</div><FontAwesomeIcon icon={faShoppingCart}/>Cart
                    </Nav.Link> 
                </Navbar>
              { showSideBar ? 
                    <aside className="sidebar">
                    <h5>Profile</h5>                   
                        {currentUser.isAuthenticated ? (
                           <ul>
                               <li><Nav.Link href={`/user/${currentUser.user.id}`}>My Profile</Nav.Link></li>
                                <li><Nav.Link  onClick={this.logout}>Logout :{currentUser.user.username}</Nav.Link></li>
                           </ul>  
                        ):
                            <Nav className="ms-auto"> 
                                <Nav.Link  href="/signin" className="active">Login</Nav.Link> 
                            </Nav>
                        }
                    <h5>Shopping Categories</h5>
                    <ul>
                        <li><Nav.Link href="#">Men's Clothing</Nav.Link></li>
                        <li><Nav.Link href="#">Women Clothing</Nav.Link></li>
                        <li><Nav.Link href="#">Electronics</Nav.Link></li>
                    </ul>
                   
                    </aside>
              : null}
            </div>
        )
    }
}

function mapStateToProps(state){ 
    return{
        currentUser: state.currentUser,
        cart:state.cart
    }
}

export default connect(mapStateToProps, {logout, fetchCart})(NavbarComponent);