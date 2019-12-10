import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import dndAPI from '../api/dndAPI.js'
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import '../App.css';

export default class Signup extends Component {  
  constructor(){
    super();
    this.state= {
    name: '',
    redirect: false,
   }
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
  componentDidMount() {
    document.body.style.backgroundColor = "#000000"
}

  passwordHash(pass){
    return pass += "hashed"
  }
  
  handleLogout = () => {
    sessionStorage.removeItem("currentUser")
    window.location.reload(false)
  }

  handleSubmitSignUp(event){
    event.preventDefault()
    const playerObject = {
      username: event.target.elements[0].value,
      password: event.target.elements[1].value
    }
    this.getUser(playerObject)
    this.setState({
      redirect:true
    })
  }  
  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to = "/" />
    }
    if (JSON.parse(sessionStorage.getItem("currentUser"))){
      return <Redirect to ="/" />
    }
    return (

      <div className='login'>
        <h1>Sign In</h1>
        <h4>Don't have an account? <Link to="/signup" id="loginLinks">Sign up</Link></h4>
        <Form onSubmit={this.handleSubmitSignUp.bind(this)}>
          <Form.Group controlId="username">
            <Form.Control className="formGroup" placeholder="Enter your user name"/>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control className="formGroup" type='password' placeholder="enter your password"/>
          </Form.Group>
          <Button id='signinButton' variant="primary" type="submit">
              SIGN IN
            </Button>
        </Form>
      </div>

    );
  }
}