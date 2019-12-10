import React, { Component } from 'react';
import tablefilterArray from '../FilterElements.js'
import Select from 'react-select'



export default class FilterButton extends Component {
  
  handleclick = (filterKey, filterValue) => {
    
    return this.props.handleFilterSelectChange(filterKey, filterValue.value)
  }

  render() { 
    const keys =[
              'game_type',
              'tablesize_pref',
              'homebrew',
              'alcohol',
              'session_lengths',
              'table_status']                

    const getMenus = () => {
      let valueArray = []
      for(let key of keys){
        let labels = (tablefilterArray[key])
        let array = []
          for(let i of labels){
            array.push({ value: i, label: i })
          }
        valueArray.push(<div className='filters' key={key}>
          <Select
          defaultValue={'red'}
          placeholder={key} 
          onChange={(val) => {this.handleclick(key, val)}} 
          key={key}
          options={array}/></div>)
      }
      return valueArray
    }   
    return (
      <div>
        {getMenus()}
      </div>
    )
  }
}
