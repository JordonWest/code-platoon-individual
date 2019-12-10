import React, { Component } from 'react';


import {Link} from "react-router-dom";

export default class TableList extends Component {
    constructor(props){
      super(props);
      this.state={
        tableLink: false
      }
    }
  
  render() {
  
    const {tables} = this.props
    let tableArray = []

    for(let table of tables){
    tableArray.push(
    <div key={table.table_id} className="tableTeaserBox">
      <div className="teaserTop">
        <div>{table.game_type}</div>
        <div>{table.table_status}</div>
      </div>

      <div>
        <div id="tableName">{table.tablename}</div>
      </div>

      <div id="tableAbout">{table.about_table}</div>

      <div className='linkDiv'>
        <Link to={`/tables/${table.table_id}`}>View Table</Link>
      </div>
    
    </div>)
    
    }

    return (

      <div>

        {tableArray}

      </div>
    );
  }
}

