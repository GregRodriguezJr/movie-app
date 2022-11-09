import React from 'react'

const MovieListHeading = (props) => {
  return (
        <div className='d-flex align-items-center justify-content-between my-3'>
            <h2 className='m-0'>{props.heading}</h2>
        </div>
    )
}

export default MovieListHeading