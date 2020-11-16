import React from 'react';

export default (props) => {

  const popupOverlay = React.useRef(null);

  const closeOnOverlayClick = (event) => {
    if (event.target === popupOverlay.current) {
      props.onClose();
    }
  }

  const handleEscClose = React.useCallback((event) => {
    if (event.key === 'Escape') {
      props.onClose();
    }
    // eslint-disable-next-line
  },[]);

  React.useEffect(() => {
    props.isOpened 
    ? document.addEventListener('keydown', handleEscClose)
    : document.removeEventListener('keydown', handleEscClose);
    // eslint-disable-next-line
  }, [props.isOpened]);

  return (
    <section className={`popup popup_${props.name} ${props.isOpened && 'popup_opened'}`}
      onMouseDown={closeOnOverlayClick}
      ref={popupOverlay}>
      {props.children}
    </section>
  );
}