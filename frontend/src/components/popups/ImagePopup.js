import React from 'react';
import Popup from './Popup';
import ImageWithError from '../UIelements/ImageWithError'

export default (props) => {
  return (
    <Popup
      name='view'
      isOpened={props.isOpened}
      onClose={props.onClose}>
      <div className='popup__photoview'>
        <ImageWithError className='popup__image'
          alt='Просмотр фото'
          src={props.card.link}/>
        <h2 className='popup__imagetitle'>{props.card.name}</h2>
        <button className='popup__reset'
          type='button'
          onClick={props.onClose} />
      </div>
    </Popup>
  );
}