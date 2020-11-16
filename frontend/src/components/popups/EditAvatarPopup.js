import React, { useState } from 'react'
import PopupWithForm from './PopupWithForm';
import InputWithBrowserValidation from '../UIelements/InputWithBrowserValidation';

export default props => {

  const [userAvatar, setUserAvatar] = useState('');
  const [userAvatarIsValid, setUserAvatarIsValid] = useState(true);
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const buttonEnabled = userAvatarIsValid;

  const resetInput = () => {
    setUserAvatar('');
    setIsAvatarTouched(false);
  }

  const handleChangeAvatar = (event) => {
    setIsAvatarTouched(true);
    setUserAvatar(event.target.value);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: userAvatar
    });
    resetInput();
  }

  const handleOnClose = () => {
    props.onClose();
    resetInput();
  }

  return (
    <PopupWithForm name='newavatar'
      title='Обновить аватар'
      buttonTitle={props.buttonTitle}
      buttonEnabled={buttonEnabled}
      isOpened={props.isOpened}
      onClose={handleOnClose}
      onSubmit={handleSubmit}>

      <InputWithBrowserValidation
        className='popup__input popup__input_top'
        type='url'
        name='avatar'
        placeholder='Ссылка на картинку'
        value={userAvatar}
        onChange={handleChangeAvatar}
        required
        isTouched={isAvatarTouched}
        onButtonStatusChange={setUserAvatarIsValid}
      />

    </PopupWithForm>
  );
}