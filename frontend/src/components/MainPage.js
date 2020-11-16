import React from 'react';

import Main from './Main';
import Footer from './Footer';

import EditProfilePopup from './popups/EditProfilePopup';
import EditAvatarPopup from './popups/EditAvatarPopup';
import AddPlacePopup from './popups/AddPlacePopup';
import ConfirmPopup from './popups/ConfirmPopup';
import ImagePopup from './popups/ImagePopup';

import { api } from '../utils/Api';

import { CurrentUserContextProvider } from '../contexts/CurrentUserContext';

export default () => {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  // Стейты для Main
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [cards, setCards] = React.useState([]);
  const [isHidden, setIsHidden] = React.useState(true); //Видимость профиля в Main

  const [isSaving, setIsSaving] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((error) => console.log('Ошибка запроса : ', error))
      .finally(() => {
        setIsHidden(false);
      });
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((item) => { return item._id === currentUser._id; });

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

  return (
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
  );
}
