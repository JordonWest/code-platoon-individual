import React, { Component } from 'react'
import { Link } from "react-router-dom";


export default class HomePage extends Component {
  
  handleLogout = () => {
    sessionStorage.removeItem("currentUser")
    window.location.reload(false)
  }
  
  render() {
    
    const {user} = this.props
          return (
          <div>
          Here is the home page.<br></br>
          {(user !== null) && <Link to="/tables">TablePage</Link>}
          {(user !== null) && <br></br>}
          {(user !== null) && <Link to="/profile">Profile page</Link>}
          {(user !== null) && <br></br>}
          {(user !== null) && <Link to="/create-table">Create table page</Link>}
          {(user == null) && <Link to="/signin">Sign in</Link>}
          {(user == null) && <br></br>}
          {(user !== null) && <button onClick={this.handleLogout}>logout button</button>}
          
          </div>
      )
  }
}



