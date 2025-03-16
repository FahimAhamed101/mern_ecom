import React, { useState } from 'react'
import commentorIcon from "../../../assets/avatar.png"
import { formatDate } from '../../../utils/formatDate';
import RatingStars from '../../../Components/RatingStars';
import PostAReview from './PostAReview';

const ReviewsCard = ({productReviews}) => {
  const reviews = productReviews || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseReviewModal = () => { 
    setIsModalOpen(false);
  }

  return (
    <div className='my-6 bg-white p-8'>
      <div>
        {
          reviews.length > 0 ? (<div>
            <h3 className='text-lg font-medium'>All comments</h3>
            <div>
              {
                reviews.map((review, index) => (
                  <div key={index} className='mt-4'>
                    <div className='flex gap-4 items-center'>
                      <img src={commentorIcon} alt="" className='size-14' />
                      <div className='space-y-1'>
                        <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{review?.userId?.username}</p>
                        <p className='text-[12px] italic'>{formatDate(review?.updatedAt)}</p>
                        <RatingStars rating={review?.rating}/>
                      </div>
                    </div>
                    <div className='text-gray-600 mt-5 border p-8'>
                      <p>{review?.comment}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>) : <p>No reviews yet!</p>
        }
      </div>

      {/*add review button */}
      <div className='mt-3'>
        <button 
        onClick={handleOpenReviewModal}
        className='px-5 py-3 bg-primary text-white rounded-md'>Add a Review</button>
      </div>

      {/*add review modal */}
      <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal}/>
    </div>
  )
}

export default ReviewsCard