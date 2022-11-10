import React from 'react'

const MovieListHeading = (props) => {
  return (
        <div className='d-flex align-items-center justify-content-between my-1'>
            <h3 className='m-0'>{props.heading}</h3>
        </div>
    )
}

export default MovieListHeading