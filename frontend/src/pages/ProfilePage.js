import React, { Component } from 'react';
import dndAPI from '../api/dndAPI.js'
import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



export default class ProfilePage extends Component {
  constructor(props){
    super(props);
    this.state = { 
      player: '',
      id: '0',
      redirect: false,
      profile: false,
      returnMain: false,
    }
  }
  async componentDidMount() {
    document.body.style.backgroundColor = "#000000"
    let thisPlayer = await dndAPI.fetchPlayerByID(this.props.user.player_id)
    this.setState({
      player: thisPlayer,
      id: thisPlayer.player_id,
      
    })
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

  async handleSubmit(event){
    event.preventDefault()
    console.log(this.state)
    console.log(event)
    const {player, id} = this.state
    const playerObject = {
      username: player.username,
      password: player.password,
      email: event.target.elements[0].value, 
      about_me: event.target.elements[1].value,  
      preferred_classes: event.target.elements[2].value, 
    }
    dndAPI.updatePlayer(id, playerObject)
      .then((response) => {
        if(response.ok){
          this.getUser(playerObject)
        }
      })  
  }
  handleReturn = () => {
    this.setState({returnMain: true})
  }
  profileLink(){
    this.setState({profile: true})
  }

render() {
  const {email, about_me, preferred_classes} = this.props.user
  if (!JSON.parse(sessionStorage.getItem("currentUser"))){
    return <Redirect to = "/" />
  }
  const { returnMain } = this.state
    if (returnMain) {
      return <Redirect to = "/" />
    }
    if (this.state.profile){
      return <Redirect to = "/profile" />
    }
  return (

      <div>
        <div className="topBanner">
            <div></div>
            <div className="profileHolder">
              <div className="profile-icon">
                <AccountCircleIcon className="profile-icon"/>
                </div>
                  <div className="bannerUserName">
                    {this.props.user.username}
                  </div>
            </div>
          </div>
        <div className="holdReturn">
          <div className="returnButton" onClick={() => this.handleReturn()}>Return to Find a Table</div>
        </div>
        <div className="login">
        <h1>EDIT PROFILE</h1>
        <div className="loginForm">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group controlId="Email">
           <Form.Control className="formGroup" placeholder={email}/>
         </Form.Group>

           <Form.Group controlId="about_me">
           <Form.Control className="formGroup" placeholder={about_me}/>
         </Form.Group>
         
         <Form.Group controlId="about_me">
           <Form.Control className="formGroup" placeholder={preferred_classes}/>
         </Form.Group>

          <Button id="signinButton" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
        </div>
      </div>
    );
  }
}

