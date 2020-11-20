import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

// Для основной страницы
import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ConfirmPopup from './popups/ConfirmPopup';
import ImagePopup from './popups/ImagePopup';

import { CurrentUserContextProvider } from '../contexts/CurrentUserContext';

// ---------------------

import ProtectedRoute from './ProtectedRoute'
import Header from './Header';
import Login from './forms/Login';
import Register from './forms/Register';

import { tokenGet, tokenSet } from '../utils/token';
import { emailGet, emailSet } from '../utils/userEmail';

import { api } from '../utils/Api';

import { AuthDataContextProvider } from '../contexts/AuthDataContext';

export default () => {

  const [authData, setAuthData] = useState({ _id: '', email: emailGet() || '', pwd: null });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const [showInfo, setShowInfo] = useState(false);
  const [successInfo, setSuccessInfo] = useState(false);

  // Набор стейт и функции главной страницы (работа с карточками и профилем)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  // Стейты для Main
  const [currentUser, setCurrentUser] = useState({ name: '', about: '' });
  const [cards, setCards] = useState([]);
  const [isHidden, setIsHidden] = useState(true); //Видимость профиля в Main

  const [isSaving, setIsSaving] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((id) => { return id === currentUser._id; });

    api.like(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((error) => console.log('Ошибка обработки лайка : ', error))
  }

  const handleCardConfirm = (card) => {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  const handleCardDelete = () => {
    setIsSaving(true);
    api.deleteCard(selectedCard._id)
      .then(() => {
        const newCards = [...cards];
        const index = newCards.findIndex((item) => { return item._id === selectedCard._id });
        if (index >= 0) {
          newCards.splice(index, 1);
          setCards(newCards);
        }
        closeAllPopups();
      })
      .catch((error) => console.log('Ошибка удаления карточки : ', error));
  }

  const handleUpdateUser = ({ name, about }) => {
    setIsSaving(true);
    api.saveProfile({ 'name': name, 'about': about })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log('Ошибка изменения данных пользователя : ', error));
  }

  const handleUpdateAvatar = ({ avatar }) => {
    setIsSaving(true);
    api.saveAvatar({ 'avatar': avatar })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((error) => console.log('Ошибка изменения аватара пользователя : ', error));
  }

  const handleCreateCard = (card) => {
    setIsSaving(true);
    api.saveCard(card)
      .then((cardData) => {
        if (cardData) {
          setCards([
            cardData,
            ...cards
          ]);
        }
      })
      .catch((error) => console.log('Ошибка создания карточки : ', error));
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsSaving(false);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  // --------------------------------

  const onCloseInfo = (url) => {
    setShowInfo(false);
    if (successInfo) {
      history.push(url);
    }
  }

  const onLogoutHandle = () => {
    setAuthData({ _id: '', email: '', pwd: null });
    setCurrentUser({ name: '', about: '' });
    setLoggedIn(false);
  }

  const handleTokenCheck = () => {
    const token = tokenGet();
    if (!token) {
      history.push('/sign-in');
      return;
    }

    api.getUser(token)
      .then((res) => {
        if (res) {
          const authData = {
            _id: res._id,
            email: res.email,
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
    api.signIn(email, password)
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
    api.signUp(email, password)
      .then((res) => {
        if (res) {
          const authData = {
            _id: res._id,
            email: res.email,
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

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((error) => console.log('Ошибка запроса : ', error))
      .finally(() => {
        setIsHidden(false);
      });
  }, [loggedIn]);

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

          <ProtectedRoute path='/' loggedIn={loggedIn}>

            <CurrentUserContextProvider value={currentUser}>

              <Main onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardConfirm}
                isHidden={isHidden}
                cards={cards}
              />
              <Footer />

              <EditProfilePopup
                isOpened={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                buttonTitle={isSaving ? 'Сохранение...' : 'Сохранить'}
              />

              <EditAvatarPopup
                isOpened={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                value={currentUser.avatar}
                buttonTitle={isSaving ? 'Сохранение...' : 'Сохранить'}
              />

              <AddPlacePopup
                isOpened={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onCreateCard={handleCreateCard}
                buttonTitle={isSaving ? 'Сохранение...' : 'Сохранить'}
              />

              <ConfirmPopup
                onConfirm={handleCardDelete}
                onClose={closeAllPopups}
                isOpened={isConfirmPopupOpen}
                buttonTitle={isSaving ? 'Сохранение...' : 'Да'}
              />

              <ImagePopup
                card={selectedCard}
                isOpened={isImagePopupOpen}
                onClose={closeAllPopups}
              />
            </CurrentUserContextProvider>

          </ProtectedRoute>

        </Switch>

      </div>
    </AuthDataContextProvider>
  );
}
