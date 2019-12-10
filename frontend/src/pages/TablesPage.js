import React, { Component } from 'react'
import dndAPI from '../api/dndAPI.js'
import TableList from '../components/TableList.js'
import FilterButton from '../components/FilterButton.js'
import { Redirect } from 'react-router'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';




export default class TablePage extends Component {
  constructor(props){
    super(props);
    this.state={
      tables: [],
      filteredTables: [],
      login: 'false',
      redirect: false,
      profile: false,
      bgColorAllTables: "#ADF965",
      bgColorMyTables: "",
    }
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#000000"
    dndAPI.fetchTables()
      .then((apiResponseJSON) => {
        this.setState({
          tables: apiResponseJSON
        })
      }
    )
  }

  refreshPage = () => {
    const {tables, filteredTables} = this.state
    let viewedArray = []
    let hiddenArray = []
    this.setState({
      bgColorMyTables: "",
      bgColorAllTables: "#ADF965",
    })
    for(let table of tables){
      viewedArray.push(table)
    }
    for(let table2 of filteredTables){
      viewedArray.push(table2)
    }
    this.setState({
      tables:viewedArray,
      filteredTables: hiddenArray
    })
  }

  handleMyTablesButton = () => {
    const {tables} = this.state
    this.setState({
      bgColorAllTables: "",
      bgColorMyTables: "#ADF965",
  })
      for(let table of tables){
        if(table.owner === this.props.user.player_id){
          this.handleFilterSelectChange('owner', this.props.user.player_id)
        }
      }  
    }
  handleSubmit = (event) =>{
    event.preventDefault()
  }
  handleLogout = () => {
    sessionStorage.removeItem("currentUser")
    window.location.reload(false)
  }
  
  handleFilterSelectChange = (filter, filterValue) => {
    
    const {tables, filteredTables} = this.state 
    let filteredTableArray = []
    let savedTableArray = []
    for(let table of tables){
      if (table[filter] === filterValue){
        filteredTableArray.push(table)
      }else(savedTableArray.push(table))
    }
    for(let otherTables of filteredTables){      
      if (otherTables[filter] === filterValue ){
        filteredTableArray.push(otherTables)
      }else(savedTableArray.push(otherTables))
    }
    return this.setState({tables:filteredTableArray}), this.setState({filteredTables: savedTableArray})
  }

  render() {
    if(this.props.user == null){
      return <Redirect to = '/signin'/>
    }
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to = "/create-table" />
    }
    const { profile } = this.state
    if (profile) {
      return <Redirect to = "/profile" />
    }
    
    if (!JSON.parse(sessionStorage.getItem("currentUser"))){
      return <Redirect to = "/" />
    }

    const createLink = () => {
        this.setState({redirect:true})
      }
      const profileLink = () => {
        this.setState({profile:true})
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
                    {this.props.user.username}
                  </div>
            </div>
          </div>

          <div className="headerDiv">
            <span><h1 id="headerTitle">Find a table</h1></span>
          <span><div onClick={() => createLink()} className="tableCreateButton">CREATE A NEW TABLE</div></span>
          </div>
          
          <div className="tableSortButtonsGroupDiv">  
            <div className="tableSortButtons" style={{backgroundColor:this.state.bgColorMyTables}} onClick={() => this.handleMyTablesButton()}>My tables</div>
            <div className="tableSortButtons" style={{backgroundColor:this.state.bgColorAllTables}} onClick={() => this.refreshPage()}>All tables</div>
          </div>
          <div>
              <h2 className="filterBanner">Filters</h2>
              
          </div>
          
          <div className="bodyDivTablePage">
            <div className="filterDiv">
              <FilterButton handleFilterSelectChange={this.handleFilterSelectChange}/>
            </div>
            <div>
              <TableList tables={this.state.tables}/>
            </div>
          </div>

        </div>
      )

  }
}

