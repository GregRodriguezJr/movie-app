import React from 'react'
import DetailsModal from './DetailsModal';

const PosterHeader = (props) => {
  return (
    <div className='d-flex justify-content-between'>
        <p className='rating'>{props.movie.vote_average}</p>
        <DetailsModal movie={props.movie}/>
    </div>
  )
}

export default PosterHeader