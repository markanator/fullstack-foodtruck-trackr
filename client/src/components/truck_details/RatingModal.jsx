/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

function RatingModal(props) {
  const [userRating, setUserRating] = useState(0);

  const closeRatingModal = () => {
    setUserRating(0);
    props.toggleModal();
  };

  const submit = () => {
    console.log('userRating', userRating);
    closeRatingModal();
  };

  return (
    <div className="text-center" isOpen={props.show}>
      <h2>Leave a Rating</h2>
      <div>
        <div className="pt-3 stars">
          {[1, 2, 3, 4, 5].map((starCount, index) => {
            if (starCount <= userRating) {
              return (
                <Button key={index} onClick={() => setUserRating(starCount)}>
                  <i
                    style={{
                      color: 'gold',
                      fontSize: '1.8rem',
                    }}
                    className="fas fa-star"
                  />
                </Button>
              );
            }
            return (
              <Button key={index} onClick={() => setUserRating(starCount)}>
                <i
                  style={{
                    color: 'gold',
                    fontSize: '1.8rem',
                  }}
                  className="far fa-star"
                />
              </Button>
            );
          })}
        </div>
        <div className="mt-4">
          <Button onClick={submit} color="primary">
            Submit
          </Button>
          <Button onClick={closeRatingModal}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
