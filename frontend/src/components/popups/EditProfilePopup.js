import React from 'react'
import PopupWithForm from './PopupWithForm';

import InputWithBrowserValidation from '../UIelements/InputWithBrowserValidation';

import { useCurrentUserContext } from '../../contexts/CurrentUserContext';

export default props => {

  const currentUser = useCurrentUserContext();

  const [userName, setUserName] = React.useState(currentUser.name);
  const [userNameIsValid, setUserNameIsValid] = React.useState(true);
  const [isUserNameTouched, setIsUserNameTouched] = React.useState(false);

  const [description, setDescription] = React.useState(currentUser.about);
  const [descriptionIsValid, setDescriptionIsValid] = React.useState(true);
  const [isDescriptionTouched, setIsDescriptionTouched] = React.useState(false);

  const buttonEnabled = userNameIsValid && descriptionIsValid;

  React.useEffect(() => {
    setUserName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpened]);

  const handleChangeName = (event) => {
    setIsUserNameTouched(true);
    setUserName(event.target.value);
  }

  const handleChangeDescription = (event) => {
    setIsDescriptionTouched(true);
    setDescription(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    props.onUpdateUser({
      name: userName,
      about: description,
    });
  }

  return (
    <PopupWithForm name='profileedit'
      title='Редактировать профиль'
      buttonTitle={props.buttonTitle}
      buttonEnabled={buttonEnabled}
      isOpened={props.isOpened}
      onClose={props.onClose}
      onSubmit={handleSubmit}>

      <InputWithBrowserValidation
        className='popup__input popup__input_name popup__input_top'
        type='text'
        name='name'
        placeholder='Имя'
        value={userName}
        onChange={handleChangeName}
        required
        minLength='2'
        maxLength='40'
        isTouched={isUserNameTouched}
        onButtonStatusChange={setUserNameIsValid}
      />

      <InputWithBrowserValidation className='popup__input popup__input_about'
        type='text'
        name='about'
        onChange={handleChangeDescription}
        placeholder='Описание'
        value={description}
        required
        minLength='2'
        maxLength='200'
        isTouched={isDescriptionTouched}
        onButtonStatusChange={setDescriptionIsValid}
      />

    </PopupWithForm>
  );
}