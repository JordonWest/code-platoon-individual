import React, { Component } from 'react';
import dndAPI from '../api/dndAPI.js'
import Table from '../components/Table.js'

export default class TableDetailPage extends Component {
  constructor(){
    super();
    this.state = {
    table: '',
    userMatch: null,
  }
}

  async componentDidMount() {
    let tables = await dndAPI.fetchTableByID(this.props.match.url)
    await this.setState({
      table: tables
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div>
        </div>
        <Table {...this.state.table} props={this.props} />
      </div>
    );
  }
}

