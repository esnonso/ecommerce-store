import React, { Component } from 'react';
import { fetchProducts, deleteProduct } from '../Store/actions/products';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

class AdminPage extends Component { 
    componentDidMount(){
        this.props.fetchProducts()
    }
    render(){
        const { products, deleteProduct } = this.props;
        const productList = products.map(p => (
            <div key={p._id} className="admin-tab">
                <p><strong>Product Id:</strong>{p._id}</p>
                <p><strong>Product Name:</strong>{p.title}</p>
                <p>
                    <button className="btn-danger" onClick={()=> deleteProduct(p._id)}>Delete</button>
                </p>
            </div>
        ))
        return(
            <Container>
                {productList}
            </Container>
        )
    }
}

function mapStateToProps(state){ 
    return{
        products: state.products
    }
}

export default connect(mapStateToProps, { fetchProducts, deleteProduct})(AdminPage);