import { Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {authUser} from '../Store/actions/auth'
import ProductForm from '../Components/productsForm';
import ProductList from './products';
import ProductItem from '../Components/showProducts';
import AuthForm from '../Components/AuthForm';
import { connect } from 'react-redux';
import Cart from './cart';
import Checkout from './checkout';
import UserProfile from './user';
import AdminPage from './adminPage';
import withAuth from '../Hocs/withAuth';

const Main = props => {
        const {authUser, currentUser } = props;
    return(
        <Switch>
            {/** HOMEPAGE ROUTE */}
            <Route exact path="/" render={()=> <Redirect to="/products" />} />

            {/** SHOW ALL PRODUCTS */}
            <Route exact path ="/products" render={props => <ProductList />} />

            {/** ADD PRODUCT ROUTE */}
            <Route exact path ="/products/add" component={withAuth(ProductForm)}/>

            {/** SHOW PRODUCT ROUTE */}
            <Route exact path ="/products/:product_id/show" render={props => <ProductItem {...props}/>} /> 

            {/** SHOW CART ROUTE */}
            <Route  path="/user/:user_id/cart"  render={props => { 
                return(
                    <Cart currentUser={currentUser} {...props} />
            )}}/>

            {/** CHECKOUT ROUTE */}
            <Route  path="/user/:user_id/checkout" render={props => { 
            return(
                <Checkout currentUser={currentUser} {...props} />
            )}}/>

            {/** SHOW USER PROFILE ROUTE */}
            <Route  path="/user/:user_id" render={props => { 
            return(
                <UserProfile currentUser={currentUser} {...props} />
            )}}/>

            {/** SIGNUP AND SIGNIN ROUTES */}
            <Route exact path ="/signin" render= {props => {
                return(
                    <AuthForm onAuth={authUser}
                        buttonText="Log In"
                        heading="Welcome back" {...props}/>
                )
            }}/>

            <Route exact path ="/signup" render= {props => {
                        return(
                            <AuthForm onAuth={authUser}
                                signUp buttonText="sign Up"
                                heading="Create your free Account!" {...props}/>
                        )
            }}/>

            {/** ADMIN ROUTE  */}
            <Route path="/admin" component={withAuth(AdminPage)} />
        </Switch>
    )
}

function mapStateToProps(state){
    return{
        currentUser: state.currentUser,
    }
}

export default withRouter(connect(mapStateToProps, { authUser} )(Main));