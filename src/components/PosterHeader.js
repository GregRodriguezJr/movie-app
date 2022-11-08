import React from 'react'

const PosterHeader = (props) => {
  return (
    <div className='d-flex justify-content-between'>
        <p className='vote-num'>{props.movie.vote_average}</p>
        <p>test image</p>
    </div>
  )
}

export default PosterHeader