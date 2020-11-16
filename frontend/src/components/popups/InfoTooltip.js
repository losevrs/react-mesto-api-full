import React from 'react';
import Popup from './Popup';

import ImageWithError from '../UIelements/ImageWithError'
import failed from '../../images/popup/failed.jpg'
import success from '../../images/popup/success.jpg'

export default (props) => {
  const successMessage = 'Вы успешно зарегистрировались!';
  const failedMessage = 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <Popup
      name='info'
      isOpened={props.isOpened}
      onClose={props.onClose}>
      <div className='popup__container'>
        <ImageWithError className='popup__infoimage'
          alt={props.isSuccess
            ? 'Успех'
            : 'Неудачно'
          }
          src={props.isSuccess
            ? success
            : failed
          } />
        <p className='popup__infomessage'>
          {props.isSuccess
            ? successMessage
            : failedMessage
          } </p>
        <button className='popup__reset'
          type='button'
          onClick={props.onClose} />
      </div>
    </Popup>
  );
}
