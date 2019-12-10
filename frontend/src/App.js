import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TablesPage from './pages/TablesPage.js'
import ProfilePage from './pages/ProfilePage.js'
import CreateTablePage from './pages/CreateTablePage.js'
import TableDetailPage from './pages/TableDetailPage.js'
import Signup from './pages/Signup.js'
import Signin from './pages/Signin.js'

import './App.css';

export default class App extends Component {
  constructor(){
    super();
    const currentUser = this.loadUser();
    this.state = {
    user: currentUser ? currentUser: null
    }
  }
  
  loadUser = () => {
    return JSON.parse(sessionStorage.getItem("currentUser"));
  }
  setsessionStorage = (userObject) =>{
    sessionStorage.setItem('sessionUser', JSON.stringify(userObject))
  }

  setUser = (object) =>{
    this.setsessionStorage(object)
    this.setState({user:object})
  }



  render() {
    const {setUser} = this
    const {user} = this.state

    const   renderCreateTablePage = (props) => {
      return (
        <CreateTablePage 
          user={user}
          history={props}
        />
      )
    }


    return (
      <div>
        <BrowserRouter>
        <Switch>
        {/* <Route exact path="/" component={() => <HomePage user={user}/>}/>  --no need for a homepage anymore.*/}
        <Route exact path="/signup" component={() => <Signup setUser={setUser}/>}/>
        <Route exact path="/signin" component={() => <Signin setUser={setUser}/>}/>
        <Route exact path="/" component={() => <TablesPage user={user}/>}/>
        <Route exact path="/tables/:tableID" component={TableDetailPage}/>
        <Route exact path="/profile" component={() => <ProfilePage user={user} setUser={setUser}/>}/>
        <Route exact path="/create-table" render={renderCreateTablePage}/>
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
