import React, { Component } from 'react';
import { Redirect } from 'react-router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class Navbar extends Component {
  constructor(){
    super();
    this.state={
      profile: false,
      logout: false,
      
    }
  }

  profileLink(){
    this.setState({profile: true})
  }

  handleLogout(){
    this.setState({logout:true})
    sessionStorage.removeItem("currentUser")
  }

  render() {

    if (this.state.profile){
      return <Redirect to = "/profile" />
    }

    if(this.state.logout){
      return <Redirect to = '/signin'/>
    }
 
    return (
      <div>
        <div className="topBanner">
            <div></div>
          <button onClick={this.handleLogout}>logout button</button>
          <div className="profile-icon" onClick={() => this.profileLink()}><AccountCircleIcon className="profile-icon"/></div>
          </div>
      </div>
    );
  }
}

export default Navbar;