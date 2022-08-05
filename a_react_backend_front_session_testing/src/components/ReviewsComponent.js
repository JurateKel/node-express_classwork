import {useState, useRef} from 'react'
import {Rating} from 'react-simple-star-rating'
import request from '../requests/Requests'


function ReviewsComponent({user, sessionUser, refresh}) {
    const [rating, setRating] = useState(50)
    const reviewRef = useRef()
    const handleRating = (rate) => {
        setRating(rate)
    }

    async function getReview() {
        const review = {
            text: reviewRef.current.value,
            rating: rating,
            sender: sessionUser.sessionUser.userName,
            receiver: user.userName 
        }
        const response = await request.post(review, 'saveReview')
        refresh()
    }
  return (
    <div className='review-wrapper'>
        <textarea ref={reviewRef} name="review" id="review" cols="30" rows="10" placeholder='Leave your review hare'/>
        <div >
            <Rating onClick={handleRating} ratingValue={rating}/>
            <button onClick={getReview}>Add review</button>
        </div>
    </div>
  )
}

export default ReviewsComponent