import React from 'react';
import Popup from './Popup';

export default (props) => {

  let enabled = true; // если извне статус не задан - значит не учитываем его
  if (props.buttonEnabled !== undefined) {
    enabled = props.buttonEnabled;
  }

  return (
    <Popup
      name={props.name}
      isOpened={props.isOpened}
      onClose={props.onClose}>
      <form className='popup__container'
        action='#'
        method='POST'
        name={`${props.name}`}
        noValidate 
        onSubmit={props.onSubmit}>
        <h2 className='popup__title'>{`${props.title}`}</h2>

        {props.children}

        <button 
          className={`popup__submit ${enabled ? '' : 'popup__submit_disabled'}`}
          disabled={enabled ? '' : 'disabled'}
          type='submit'>{props.buttonTitle}</button>
        <button className='popup__reset'
          type='button'
          onClick={props.onClose} />
      </form>
    </Popup>
  );
}