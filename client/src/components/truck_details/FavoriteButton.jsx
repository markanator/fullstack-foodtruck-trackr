/* eslint-disable react/prop-types */
import React from 'react';

function FavoriteButton({ isFavorited, addToFavorites, removeFromFavorites }) {
  return (
    <div>
      {!isFavorited && (
        <button type="button" onClick={addToFavorites}>
          <i
            style={{
              color: 'hotpink',
              fontSize: '3rem',
              bottom: '5%',
              right: '5%',
            }}
            className="far fa-heart position-absolute"
          />
        </button>
      )}
      {isFavorited && (
        <button type="button" onClick={removeFromFavorites}>
          <i
            style={{
              color: 'hotpink',
              fontSize: '3rem',
              bottom: '5%',
              right: '5%',
            }}
            className="far fa-heart position-absolute"
          />
        </button>
      )}
    </div>
  );
}

export default FavoriteButton;
