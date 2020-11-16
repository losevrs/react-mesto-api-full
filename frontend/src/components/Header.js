import React from 'react';
import logo from '../images/header/logo.svg';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import { tokenDelete } from '../utils/token';
import { emailDelete, emailGet } from '../utils/userEmail';
import BurgerButton from '../components/UIelements/BurgerButton';

export default (props) => {
  const history = useHistory();
  const [showChild, setShowChild] = React.useState(false);
  
  const onLogoutClick = () => {
    tokenDelete();
    emailDelete();
    if (props.onLogout) {
      props.onLogout();
    }
    history.push('/sign-in')
  }

  const onToggleHandle = () => {
    setShowChild(!showChild);
  }

  return (
    <header className='header' >
      <img className='header__logo'
        src={logo}
        alt='Логотип' />
      <div className={`header__children ${showChild ? 'header__children_visible' : 'header__children_hidden'}`}>
        <Route exact path='/'>
          <p className='header__email'>{props.userEmail || emailGet()}</p>
        </Route>
        <Switch>
          <Route path='/sign-in'>
            <Link className='header__link' to='/sign-up'>Регистрация</Link>
          </Route>
          <Route path='/sign-up'>
            <Link className='header__link' to='/sign-in'>Вход</Link>
          </Route>
          <Route exact path='/'>
            <Link className='header__link header__link_logout' to='/sign-in' onClick={onLogoutClick}>Выход</Link>
          </Route>
        </Switch>
      </div>
      <BurgerButton onToggle={onToggleHandle} />
    </header>
  );
}
