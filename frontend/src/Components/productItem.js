import { Col } from "react-bootstrap";
import Photo from '../Images/default-img.png';

const ProductItem = ({name, title, amount, id}) => {
    return (
            <Col xs={6} lg={3} className="product-container">
                    <p><img src={Photo} className='img-thumbnail' alt="productImg"/></p>
                    <p className="text-muted"><b>{title}</b></p>
                        <p>#{amount}</p> 
                     <a  className="btn " href={`/products/${id}/show`}>Show more</a>
            </Col>
            
    )
}
export default ProductItem;