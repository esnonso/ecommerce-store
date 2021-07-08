import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';
import { faFacebook, faInstagram, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";
import {  faShoppingCart} from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
    render(){
        return(
        <Container fluid className="footer">
            <Container className="social">
                <h1 style={{color:"gray"}}>ShopOnline<span className="logo-com display-5">.Com</span></h1>
                <p><FontAwesomeIcon icon={faFacebook} size="3x"/></p>
                <p><FontAwesomeIcon icon={faInstagram} size="3x" /></p> 
                <p><FontAwesomeIcon icon={faTwitterSquare} size="3x" /></p> 
            </Container>
            <Container className="footer-link">
                <p className="display-5 text-muted">Quick Links</p>
                <p><a href="/">Home</a></p>
                <p><a href="/products">Products</a></p>
                <p><a href="/about">About</a></p>
                <p><a href="/contact">Contact</a></p>
                <p><FontAwesomeIcon icon={faShoppingCart} /><a href="/cart">Shopping Cart</a></p>
            </Container>
            <Container className="footer-tag" style={{fontSize:10}}>
                <p>Experince Luxury Shopping</p>
                <p className="text-muted"><em>&copy;Copwright 2021</em></p>
                <p ><span className="text-muted"><em>All rights reserved by </em></span><b>Cybernon</b></p>
            </Container>
        </Container>
        )
    }
}

export default Footer;