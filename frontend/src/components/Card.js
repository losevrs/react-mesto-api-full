import React from 'react';
import ImageWithError from './UIelements/ImageWithError'

import { useCurrentUserContext } from '../contexts/CurrentUserContext';

export default ({card, onCardClick, onCardLike, onCardDelete}) => {
  const currentUser = useCurrentUserContext();

  const canAddDelete = card.owner._id === currentUser._id;
  const likeShow = card.likes.some((item) => { return item._id === currentUser._id; });

  const handleCardClick = () => {
    onCardClick(card);
  }

  const handleCardLike = () => {
    onCardLike(card);
  }

  const handleCardDelete = () => {
    onCardDelete(card);
  }

  return (
    <div className='photocard'>
      <ImageWithError className='photocard__viewport'
        src={card.link}
        alt='Фото места'
        onClick={handleCardClick}
        onError={null} />

      <button className={`photocard__delete ${canAddDelete && 'photocard__delete_show'}`}
        type='button'
        onClick={handleCardDelete}
      />

      <div className='photocard__description'>
        <h2 className='photocard__placename'>{card.name}</h2>
        <div className='photocard__likes'>
          <button className={`photocard__like ${likeShow && 'photocard__like_on'}`}
            type='button'
            onClick={handleCardLike}
          />
          <span className='photocard__count'>{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}