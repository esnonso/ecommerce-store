import React, { Component } from 'react';
import { connect } from 'react-redux'

export default function withAuth(ComponentToBeRendered){
    class Authenticate extends Component{
        componentDidMount() {
            if(this.props.isAdmin === false){
                this.props.history.push('/products')
            }
        }
        componentDidUpdate() {
            if(this.props.isAdmin === false){
                this.props.history.push('/products')
            }
        }

        render(){
            return <ComponentToBeRendered {...this.props} />
        }
    }

    function mapStateToProps(state) {
        return{
            isAuthenticated: state.currentUser.isAuthenticated,
            isAdmin: state.currentUser.isAdmin
        }
    }
    
    return connect(mapStateToProps)(Authenticate)
 }

