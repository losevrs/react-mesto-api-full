import React from 'react'
import PopupWithForm from './PopupWithForm';

export default props => {

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onConfirm();
  }

  return (
    <PopupWithForm name='confirm'
      title='Вы уверены?'
      buttonTitle={props.buttonTitle}
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}