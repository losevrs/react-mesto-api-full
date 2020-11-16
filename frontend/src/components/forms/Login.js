import React from 'react'
import SignForm from './SignForm';
import InputWithBrowserValidation from '../UIelements/InputWithBrowserValidation';

import { useAuthDataContext } from '../../contexts/AuthDataContext';

export default props => {
  const authData = useAuthDataContext();

  const [userEmail, setUserEmail] = React.useState('');
  const [userEmailIsValid, setUserEmailIsValid] = React.useState(true);
  const [isUserEmailTouched, setIsUserEmailTouched] = React.useState(false);

  const [userPassword, setUserPassword] = React.useState('');
  const [userPasswordIsValid, setUserPasswordIsValid] = React.useState(true);
  const [isUserPasswordTouched, setIsUserPasswordTouched] = React.useState(false);

  const buttonEnabled = userEmailIsValid && userPasswordIsValid;

  React.useEffect(() => {
    setUserEmail(authData.email);
    if (authData.pwd) {
      setUserPassword(authData.pwd);
    }
  }, [authData]);

  const handleChangeEmail = (event) => {
    setIsUserEmailTouched(true);
    setUserEmail(event.target.value);
  }

  const handleChangePassword = (event) => {
    setIsUserPasswordTouched(true);
    setUserPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ 'email': userEmail, 'password': userPassword });
  }

  return (
    <SignForm
      title='Вход'
      buttonTitle='Войти'
      buttonEnabled={buttonEnabled}
      onSubmit={handleSubmit}
      linkText='Ещё не зарегистрированы? Регистрация'
      linkTo='/sign-up'
      showInfo={props.showInfo}
      success={props.success}
      closeInfo={props.onCloseInfo}
    >

      <InputWithBrowserValidation
        className='signform__input popup__input_email'
        wrapClasses='signform__inputdiv'
        type='email'
        name='email'
        placeholder='Email'
        value={userEmail}
        onChange={handleChangeEmail}
        required
        maxLength='40'
        isTouched={isUserEmailTouched}
        onButtonStatusChange={setUserEmailIsValid}
      />

      <InputWithBrowserValidation
        className='signform__input popup__input_password'
        wrapClasses='signform__inputdiv'
        type='password'
        name='password'
        placeholder='Пароль'
        value={userPassword}
        onChange={handleChangePassword}
        required
        maxLength='40'
        isTouched={isUserPasswordTouched}
        onButtonStatusChange={setUserPasswordIsValid}
      />

    </SignForm>);
}