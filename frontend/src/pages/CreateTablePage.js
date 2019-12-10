import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import dndAPI from '../api/dndAPI.js'
import Select from 'react-select'
import tablefilterArray from '../FilterElements.js'
import { Redirect } from 'react-router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class CreateTablePage extends Component {
  state = {
    'tableCreateObject': {},
    'returnMain': false,
    'logout': false,
    'profile': false,
  }

  componentDidMount() {
    document.body.style.backgroundColor = "black"
  }

  handleclick = (key, value, object) => {
    value = value.value
    object[key] = value
    this.setState({ tableCreateObject:object })
  }

  handleReturn = () => {
    this.setState({ returnMain: true })
  }

  handleSubmit = (event) => {
    const { tableCreateObject } = this.state
    let newTableObject = {
      owner: this.props.user.player_id,
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
    this.handleReturn()
    dndAPI.addTable(newTableObject)
  }
  getMenus = () => {
    const keys = [
      'game_type',
      'tablesize_pref',
      'homebrew',
      'alcohol',
      'session_lengths',
      'table_status']
    let valueArray = []
    for (let key of keys) {
      let labels = (tablefilterArray[key])
      let array = []
      for (let i of labels) {
        array.push({ value: i, label: i })
      }
      valueArray.push(<div key={key} className='filters'><Select placeholder={key} onChange={(val) => { this.handleclick(key, val, this.state.tableCreateObject) }} key={key} options={array} /></div>)
    }
    return valueArray
  }

  
  
  render() {
    const profileLink = () => {
      this.setState({ profile: true })
    }

    const { returnMain } = this.state
    if (returnMain) {
      return <Redirect to="/" />
    }

    const { profile } = this.state
    if (profile) {
      return <Redirect to="/profile" />
    }
    return (
      <div>
        <div className="topBanner">
          <div></div>
          <div className="profileHolder">
            <div className="profile-icon" onClick={profileLink}>
              <AccountCircleIcon className="profile-icon" />
            </div>
            <div className="bannerUserName">
              {this.props.user.username}
            </div>
          </div>
        </div>

        <div className="holdReturn">
          <div className="returnButton" onClick={this.handleReturn}>Return to Find a Table</div>
        </div>

        <div className="createTableBody">
          <div></div>
          <div className="createTableBodyMain">
            <h1>Create a Table</h1>

            <div className='formDiv'>
              <Form className="formClass" onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group controlId="address">
                  <Form.Control className="formGroup" placeholder="Table Address" />
                </Form.Group>

                <Form.Group controlId="tablename">
                  <Form.Control className="formGroup" placeholder="Name of your Table" />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Control className="formGroup" placeholder="Table Email" />
                </Form.Group>

                <Form.Group controlId="about_table">
                  <Form.Control id="formAboutTable" placeholder="Table description/background" />
                </Form.Group>

                <Form.Group controlId="table_times">
                  <Form.Control className="formGroup" input="wrap" placeholder="When does this table meet?" />
                </Form.Group>

                {this.getMenus()}
                <Button id='saveTableButton' variant="primary" type="submit">
                  SAVE TABLE
            </Button>
              </Form>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );

  }
}