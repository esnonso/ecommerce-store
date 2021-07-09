import React, {Component} from 'react';
import { Button , Container, Form} from 'react-bootstrap';
import { postProducts } from '../Store/actions/products';
import '../productsForm.css';

class ProductForm extends Component {
    static defaultProps = {
        onClose() {}
    }
    constructor(props){
        super(props);
        this.state = {
            category:'',
            title:'',
            amount:'',
            description:'',
            features:['']
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleNewProduct = this.handleNewProduct.bind(this);
        this.handleAddNewFeatureInput = this.handleAddNewFeatureInput.bind(this)
        this.handleAddNewFeature = this.handleAddNewFeature.bind(this);
    }

     handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleNewProduct(e) {
        e.preventDefault();
        postProducts(this.state)
        .then(() => {
            this.setState ({
                category:'',
                title:'',
                amount:'',
                description:'',
                features:['']
            }) 
        })
        this.props.history.push('/products')
    }

    handleAddNewFeatureInput(e){
        const index = Number(e.target.name.split('-')[1]) 
        const features = this.state.features.map((feat, i) => (
            i===index ? e.target.value : feat 
            ))
            this.setState({features})
    }
    handleAddNewFeature(e){
        const {features} = this.state
        this.setState({features:[...features, ""]})
    }

    render(){
       const { category, title, amount, description, features} = this.state;
       
       let inputs = features.map((ing, index)=> (
            <div  key={`features-${index}`}>
            <label>{index + 1}</label>
            <input className="form-control"
            type="text" 
            name={`features-${index}`}
            value={ing}
            size={30}
            autoComplete ="off"
            placeholder="features"
            onChange ={this.handleAddNewFeatureInput}></input>
            </div>
           )) 
        return(
            <Container >
            <Container >
                <Container >
                    <h4 >ADD NEW PRODUCT</h4>
                </Container>
                <Container >
                    <Form onSubmit={this.handleNewProduct}>
                                <Form.Label>Category</Form.Label>
                                <input type="text" className="form-control"
                                 name="category"
                                  id="category"
                                  value={category}
                                  onChange={this.handleChange}></input>

                                <Form.Label>Title</Form.Label>
                                <input type="text"
                                name="title"
                                id="title"
                                value={title}
                                onChange={this.handleChange}
                                className="form-control"></input> 

                                <Form.Label>Amount</Form.Label>
                                <input type="number"
                                name="amount"
                                id="amount"
                                value={amount}
                                onChange={this.handleChange}
                                className="form-control"></input>

                            <Form.Label>Description</Form.Label>
                                <textarea type="text"
                                name="description"
                                id="description"
                                value={description}
                                onChange={this.handleChange}
                                className="form-control"></textarea> 

                                <Form.Label><h4>Features</h4></Form.Label>
                               {inputs} 
                                <p><Button  variant="success" onClick={this.handleAddNewFeature}>+</Button></p>                              
                                <Button type="submit" >Save Product</Button>  
                    </Form>
                </Container>
                <Container className="modals-footer">
                </Container>
            </Container>
        </Container>
        )
    }
}


export default ProductForm;