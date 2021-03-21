import React from 'react'

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import styles from './SearchAutoComplete.module.css';

function SearchAutoComplete(props) {
  const items = [
    {
      id: 0,
      name: 'moon'
    },
    {
      id: 1,
      name: 'sun'
    },
    {
      id: 2,
      name: 'Mars'
    },
    {
      id: 3,
      name: 'Jupiter'
    },
    {
      id: 4,
      name: 'Pluto'
    }
  ]

  const handleOnFocus = () => {
    console.log('Focused')
  }

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.searchBox}>
        <div style={{ width: 300 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={props.handleChange}
            onFocus={handleOnFocus}
            autoFocus
          />
          
        </div> 
        <button className={styles.btnSearch} onClick={props.onSearchBtnClick} >Search</button>
        </div>
      </header>
    </div>
  )
}

export default SearchAutoComplete;