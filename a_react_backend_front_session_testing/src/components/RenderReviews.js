import React from 'react'
import {Rating} from 'react-simple-star-rating'


function RenderReviews({reviews}) {
  return (
    <div className='reviews-wrapper'>
        {reviews.error === false && reviews.reviews.map(x => 
            <div key={x._id} className='review'>
                <h4>{x.sender}</h4>
                <p>{x.text}</p>
                <Rating ratingValue={x.rating}/>
            </div>
            )}
    </div>
  )
}

export default RenderReviews