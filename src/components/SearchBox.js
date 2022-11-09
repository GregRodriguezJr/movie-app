import React from 'react'

const SearchBox = (props) => {
  return (
    <div className='mx-3'>
        <input 
          type="text" 
          className='form-control' 
          placeholder='Type to search' 
          value={props.value}  
          onChange={(event) => props.setSearchValue(event.target.value)}
        />
    </div>
  )
}

export default SearchBox