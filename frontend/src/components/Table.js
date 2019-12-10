import React, { Component } from 'react';
import dndAPI from '../api/dndAPI.js'
import Iframe from 'react-iframe'
import '../App.js'
import { Form, Button } from 'react-bootstrap'
import tablefilterArray from '../FilterElements.js'
import Select from 'react-select'
import { Redirect } from 'react-router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
        edit: false,
        table: {},
        redirect: false,
        userMatch: null,
        url: null,
        tableCreateObject: {},
        returnMain: false,
        profile: false,
    }
  }
  componentDidMount(){
    document.body.style.backgroundColor = "black"
  }
  getMenus = () => {
    const keys =[
              'game_type',
              'tablesize_pref',
              'homebrew',
              'alcohol',
              'session_lengths',
              'table_status']

    let valueArray = []
    for(let key of keys){
      let labels = (tablefilterArray[key])
      let array = []
        for(let i of labels){
          array.push({ value: i, label: i })
        }
    valueArray.push(<div key={key} className='filters'><Select placeholder={this.props[key]} onChange={(val) => {this.handleclick(key, val)}} key={key} options={array}/></div>)
    }
    return valueArray
  }

  handleReturn = () => {
    this.setState({returnMain: true})
  }
  
  handleEdit = () => {
    this.setState({edit: true})
  }
  
  handleclick = (key, value, object) => {
    value = value.value
    object[key] = value
    this.setState({ tableCreateObject:object })
  }
  
  handleSaveState = () => {
    this.setState({edit: true})
  }
  
  handleSave = (event) => {
    event.preventDefault()
    let sessionOwner = JSON.parse(sessionStorage.getItem("currentUser"));
    const {tableCreateObject} = this.state
    let newTableObject = {
      owner: sessionOwner.player_id,
      address: event.target.elements[0].value,
      tablename: event.target.elements[1].value,
      email: event.target.elements[2].value,
      about_table: event.target.elements[3].value,
      game_type: tableCreateObject.game_type,
      tablesize_pref: tableCreateObject.tablesize_pref,
      homebrew: tableCreateObject.homebrew,
      alcohol: tableCreateObject.alcohol,
      session_lengths: tableCreateObject.session_lengths,
      table_status: tableCreateObject.table_status,
      table_times: event.target.elements[4].value,
    }
    dndAPI.updateTable(this.props.table_id, newTableObject)
  }
  
  render() {
    const handleDelete = () => {
      alert("table deleted")
      dndAPI.deleteTable(this.props.table_id)
      this.setState({redirect:true})
    }

    let user = ""
    if(this.props.owner === JSON.parse(sessionStorage.getItem("currentUser")).player_id){
      user = JSON.parse(sessionStorage.getItem("currentUser"))
    }
    
    const profileLink = () => {
      this.setState({profile:true})
    }

      const { redirect } = this.state
      if (redirect) {
        return <Redirect to = "/" />
      }
      const { profile } = this.state
    if (profile) {
      return <Redirect to = "/profile" />
    }
    if (!JSON.parse(sessionStorage.getItem("currentUser"))){
      return <Redirect to = "/" />
  }
  const { tablename, email, address, about_table, game_type, tablesize_pref, homebrew, alcohol, session_lengths, table_times, table_status } = this.props
  const { returnMain } = this.state
  if (returnMain) {
    return <Redirect to = "/" />
  }
  
  if(this.state.edit === true){
    return (
      <div>
        <div className="topBanner">
            <div></div>
            <div className="profileHolder">
              <div className="profile-icon" onClick={() => profileLink()}>
                <AccountCircleIcon className="profile-icon"/>
                </div>
                  <div className="bannerUserName">
                    {user.username}
                  </div>
            </div>
          </div>
        <div className="holdReturn">
          <div className="returnButton" onClick={() => this.handleReturn()}>Return to Find a Table</div>
        </div>

        <div className="createTableBody">
          <div></div>
          <div className="createTableBodyMain">
            <h1>Editing table: {tablename}</h1>

            <div className='formDiv'>
            <Form className="formClass" onSubmit={this.handleSave}>
              <Form.Group controlId="address">
                <Form.Control className="formGroup" placeholder={address}/>
              </Form.Group>

              <Form.Group controlId="tablename">
                <Form.Control  className="formGroup" placeholder={tablename}/>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Control className="formGroup" placeholder={email}/>
              </Form.Group>
            
              <Form.Group controlId="about_table">
                <Form.Control className="formGroup" placeholder={about_table}/>
              </Form.Group>

              <Form.Group controlId="table_times">
                <Form.Control className="formGroup" placeholder={table_times}/>
              </Form.Group>

            {this.getMenus()}
            <Button id="saveTableButton" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
 

    return (
      <div>
         <div className="topBanner">
            <div></div>
            <div className="profileHolder">
              <div className="profile-icon" onClick={() => profileLink()}>
                <AccountCircleIcon className="profile-icon"/>
                </div>
                  <div className="bannerUserName">
                    {user.username}
                  </div>
            </div>
          </div>
         <div className="holdReturn">
          <div className="returnButton" onClick={() => this.handleReturn()}>Return to Find a Table</div>
        </div>

        <div className="viewTableL1">
          <div className="viewTableL1Left">
            <div className="spacerDivForViewTableL1"></div>
            <div id='L1gametype'>{game_type}</div>
          </div>
            {user && <div onClick={() => this.handleEdit()} className="editTableButton"><div>EDIT TABLE</div>
          </div>}
        </div>

        <div className="viewTableL2">
          <div className="tableViewTableName">{tablename}</div>
          {user && <div onClick={handleDelete} className="deleteTableButton">
            <div>DELETE TABLE</div>
          </div>}
        </div>

        <div className="viewTableL3">
          <div>{tablesize_pref}</div>
          <div>{homebrew}</div>
          <div>{alcohol}</div>
          <div>{session_lengths} </div>
        </div>
        
        <div className="viewTableL3">
          {email}
        </div>

        <div className="viewTableL4">
          <div className="L4SpacerDiv"></div>
          <div>Status: {table_status}</div>
        </div>

        <div className="viewTableL5">
          <div className="L5AboutTable">{about_table}</div>
        </div>

        <div className="iframeSpacer"></div>

        <div className='IframeDiv'>
          <div></div>
        <Iframe url={`https://www.google.com/maps/embed/v1/place?q=${address}&key=AIzaSyBJ25w_m7W_vKNdNHsoa0ljrH0mUhwq9FY`}
        width="65%"
        height="450px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>
        <div></div>
        </div>

      </div>
   
    )}
  }


export default Table;