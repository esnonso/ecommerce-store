import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../Store/actions/products';
import ProductItem from '../Components/productItem';
import { Container, Row} from 'react-bootstrap'; 

class ProductList extends Component {
    componentDidMount(){
        this.props.fetchProducts()
    }
 
    render(){
        const { products } = this.props;
        let productList = products.map(p => (
            <ProductItem key={p._id} id={p._id} amount={p.amount}  title={p.title}/> 
           )) 
        return(
            <Container>
                <Row className="product-container">
                {productList}
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state){ 
    return{
        products: state.products
    }
}

export default connect(mapStateToProps, { fetchProducts})(ProductList);