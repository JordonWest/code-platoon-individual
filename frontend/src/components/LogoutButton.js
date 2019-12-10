import React, { Component } from 'react';

class LogoutButton extends Component {
  render() {
    return (
      <div>
        <button onClick={this.handleLogout}>logout button</button>
      </div>
    );
  }
}

export default LogoutButton;