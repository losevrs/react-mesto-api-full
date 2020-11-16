import React from 'react';
import errorImage from '../../images/onerror.jpg';

export default (props) => {

  const [hasOnLoadError, setHasOnLoadError] = React.useState(false);

  React.useEffect(() => {
    setHasOnLoadError(false);
  },[props.src]);

  const onLoadImageError = () => {
    setHasOnLoadError(true);
  }

  return (
    <img className={props.className}
      src={hasOnLoadError ? errorImage : props.src}
      alt={props.alt}
      onError={onLoadImageError}
      onClick={props.onClick} />
  );
}