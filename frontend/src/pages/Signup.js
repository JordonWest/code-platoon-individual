import React, { Component } from 'react';
import { Form, Button, ButtonToolbar } from 'react-bootstrap'
import dndAPI from '../api/dndAPI.js'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import '../App.css';


export default class Signup extends Component {
  
  constructor(){
    super();
    this.state= {
    name: ''
   }
  }
  componentDidMount() {
    document.body.style.backgroundColor = "#000000"
}

  async getUser(newUser){
    const playerArray = await dndAPI.fetchPlayers()
    const foundPlayers = playerArray.filter(player => player.username === newUser.username)
    if(foundPlayers){
        this.setState({ redirect: true }) 
        sessionStorage.setItem("currentUser", JSON.stringify(foundPlayers[0]))
        this.props.setUser(foundPlayers[0])
    }
  }

  passwordHash(pass){
    return pass += "hashed"
  }

  handleSubmitSignUp(event){
    event.preventDefault()
    console.log(event)
    const playerObject = {
      username: event.target.elements[0].value,
      password: this.passwordHash(event.target.elements[1].value),
      email: event.target.elements[2].value, 
      about_me: event.target.elements[3].value, 
      preferred_classes: event.target.elements[4].value, 
    }
    dndAPI.addPlayer(playerObject)
    .then((response) => {
      if(response.ok){
        this.getUser(playerObject)
      }
    })  
    this.setState({
      redirect: true
    })
  }

  render() {
    
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to = "/" />
    }
    return (

      <div className='login'>
        <div>
        <h1>Create an Account</h1>
        </div>
        <h4>Already have an account? <Link to="/signin" id="loginLinks">Sign in</Link></h4>
        <div className="loginForm">
        <Form onSubmit={this.handleSubmitSignUp.bind(this)}>
          <Form.Group controlId="username">
            <Form.Control className="formGroup" placeholder="Select a user name"/>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control type='password' className="formGroup" placeholder="Enter a password" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Control className="formGroup" placeholder="Enter your email"/>
          </Form.Group>
          
          <Form.Group controlId="about_me">
            <Form.Control className="formGroup" placeholder="Tell us about yourself"/>
          </Form.Group>

          <Form.Group controlId="preferred_classes">
            <Form.Control className="formGroup" placeholder="Preferred classes"/>
          </Form.Group>
          <ButtonToolbar>
            <Button id='signinButton' type="submit">
            GET STARTED
            </Button>
          </ButtonToolbar>
          </Form>
        </div>
      </div>

    );
  }
}

