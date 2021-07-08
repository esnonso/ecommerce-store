import React, { Component } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';

export default class AuthForm extends Component {
    constructor(props){
        super(props)
        this.state= {
            email:"",
            username:"",
            password:"",
            firstname:"",
            surname:""
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const authType = this.props.signUp ? "signup": "signin"; //if this.props is signup then signup, otherwise sign in
        this.props.onAuth(authType, this.state)
        .then(()=> {
            this.props.history.push('/')
        })
        .catch((e) => {
            return 
        })
    }
    render(){
        const { email,  username, firstname, surname } = this.state
        const { heading, buttonText, signUp} = this.props
        return(
            <Container>
                  <Form onSubmit={this.handleSubmit} style={{width:"500px", margin:"0 auto"}} >
                     <Form.Group>
                        <Form.Label >Email</Form.Label>
                      <input className="form-control"
                        type="email"
                        id="email" 
                        name="email"
                        onChange={this.handleChange} 
                        value={email} />
                       
                       <Form.Label >Password</Form.Label>
                      <input className="form-control"
                        type="password"
                        id="password" 
                        name="password"
                        onChange={this.handleChange} 
                       />
                      { !signUp? ( <div><p>Don't have an account?</p>
                       <p className="text-muted">Click <a href="/signup">Here</a> to register</p></div>):""}
                       {signUp && (
                             <div>
                                <h2>{heading}</h2>
                                <Row>
                                    <Col>
                                <Form.Label >First Name</Form.Label>
                                <input className="form-control"
                                    type="text"
                                    id="firstname" 
                                    name="firstname"
                                    onChange={this.handleChange} 
                                    value={firstname} />
                                        </Col>
                                        <Col>
                                    <Form.Label >Surname</Form.Label>
                                <input className="form-control"
                                    type="text"
                                    id="surname" 
                                    name="surname"
                                    onChange={this.handleChange} 
                                    value={surname} /> 
                                        </Col>   
                                </Row>
                                        <Form.Label >Username</Form.Label>
                                        <input className="form-control"
                                        type="text"
                                        id="username" 
                                        name="username"
                                        onChange={this.handleChange} 
                                        value={username} />

                                <p>Already have an account?</p>
                            <p className="text-muted">Click <a href="/signin">Here</a> to login</p>
                           </div>
                       )}

                       <button type="submit" className="btn btn-primary btn-block btn-lg" style={{marginTop: "10px"}}>
                           {buttonText}
                       </button>
                    </Form.Group>
                  </Form>
          </Container>
        )
    }
}