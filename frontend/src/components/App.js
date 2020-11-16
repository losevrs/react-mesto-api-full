import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute'
import MainPage from './MainPage';
import Header from './Header';
import Login from './forms/Login';
import Register from './forms/Register';

import { tokenGet, tokenSet } from '../utils/token';
import { emailGet, emailSet } from '../utils/userEmail';
import { getUser, signUp, signIn } from '../utils/yapApi';

import { AuthDataContextProvider } from '../contexts/AuthDataContext';

export default () => {

  const [authData, setAuthData] = useState({ _id: '', email: emailGet() || '', pwd: null });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const [showInfo, setShowInfo] = useState(false);
  const [successInfo, setSuccessInfo] = useState(false);

  const onCloseInfo = (url) => {
    setShowInfo(false);
    if (successInfo) {
      history.push(url);
    }
  }

  const onLogoutHandle = () => {
    setAuthData({ _id: '', email: '', pwd: null });
    setLoggedIn(false);
  }

  const handleTokenCheck = () => {
    const token = tokenGet();
    if (!token) {
      history.push('/sign-in');
      return;
    }

    getUser(token)
      .then((res) => {
        if (res) {
          const authData = {
            _id: res.data._id,
            email: res.data.email,
            pwd: null
          }
          setAuthData(authData);
          setLoggedIn(true);
          history.push('/')
        }
      })
      .catch((error) => {
        setSuccessInfo(false);
        setShowInfo(true);
        console.log(error);
      });
  }

  const onSubmitLogin = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        tokenSet(res.token);
        emailSet(email);
        setLoggedIn(true);
        history.push('/')
      })
      .catch((error) => {
        setSuccessInfo(false);
        setShowInfo(true);
        console.log(error);
      });
  }

  const onSubmitRegister = ({ email, password }) => {
    signUp(email, password)
      .then((res) => {
        if (res) {
          const authData = {
            _id: res.data._id,
            email: res.data.email,
            pwd: password
          }
          setAuthData(authData);
          setSuccessInfo(true);
          setShowInfo(true);
        }
      })
      .catch((error) => {
        setSuccessInfo(false);
        setShowInfo(true);
        console.log(error);
      })
  }

  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthDataContextProvider value={authData}>
      <div className='page'>
        <Header
          userEmail={authData.email}
          onLogout={onLogoutHandle} />
        <Switch>
          <Route path='/sign-in'>
            <Login
              onSubmit={onSubmitLogin}
              showInfo={showInfo}
              success={successInfo}
              onCloseInfo={() => onCloseInfo('/')}
            />
          </Route>
          <Route path='/sign-up'>
            <Register
              onSubmit={onSubmitRegister}
              showInfo={showInfo}
              success={successInfo}
              onCloseInfo={() => onCloseInfo('/sign-in')}
            />
          </Route>
          <ProtectedRoute loggedIn={loggedIn} component={MainPage} />
        </Switch>
      </div>
    </AuthDataContextProvider>
  );
}
