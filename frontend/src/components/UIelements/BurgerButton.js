import React from 'react';

export default (props) => {
  const [isActive, setIsActive] = React.useState(false);

  const onClickHandle = () => {
    setIsActive(!isActive);
    if (props.onToggle) {
      props.onToggle();
    }
  }

  return (
    <button
      className={`burger-button ${isActive && 'burger-button_active'}`}
      onClick={onClickHandle}>
      <span className="burger-button__lines"></span>
    </button>
  );
}
