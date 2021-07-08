import React, { Component } from 'react';
import { Container, Row, Button, Col} from 'react-bootstrap';
import Photo from '../Images/default-img.png';
import axios from 'axios';

 class ShowProductItem extends Component {
    constructor(props){
        super(props)
        this.state = {
            product:[],
            quantity:1
        }

        this.addProductToCart = this.addProductToCart.bind(this)
    }

    async componentDidMount(){
        const { product_id } = this.props.match.params;
        const url = `http://localhost:3001/api/products/${product_id}`
        await axios.get(url)
        .then(data => data.data)
        .then(product => this.setState({product}))
     }

     handleChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
     addProductToCart(product){
         const oldProducts = localStorage.getItem("cart") ? localStorage.getItem('cart'): '[]'
         const oldProductsArray = JSON.parse(oldProducts)
         oldProductsArray.push(product)
         alert("Added to Cart")
         localStorage.setItem('cart', JSON.stringify(oldProductsArray))
     }

        render(){
            const { product, quantity } = this.state;
            const productList = product.map((p, i)=> (
                <div key={p._id} className="show">
                    <p ><b>{p.title}</b></p>
                    <p><b>amount</b>:$ {p.amount}</p>
                    <p className="text-muted"><b>Description</b>: {p.description}</p>
                    <p><b>Features</b>:{p.features.map((f, i)=> <li key={i}>{f}</li>)}</p>
                    <p>Qty:<input onChange={this.handleChange} 
                        type="number"  name="quantity" min="1" max="999"
                        value={quantity} style={{width:40, border:"2px black solid"}}/>
                    </p>
                    <Button 
                        variant="primary"
                        onClick={()=> this.addProductToCart({name:p.productName, amount:p.amount, quantity, id:p._id})}>
                        Add To Cart
                    </Button>
                </div>
            ))  
            return(
                <Container style={{textAlign:"left"}}>
                    <a href="/" >Back to All Products</a>
                    <Row>
                    <Col xs={12} lg={6}><img src={Photo} alt="img" height="100%" width="100%"></img></Col>
                    <Col>
                    { productList }
                    </Col>
                    </Row>
                </Container>
            )
        }
}

export default ShowProductItem;