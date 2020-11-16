import React, { useEffect, useRef, useState } from 'react'

export default (props) => {

  const [isValid, setIsValid] = useState(true);
  const [validationMessage, setValidationMessage] = useState('None');

  let input = useRef(null);

  const validate = () => {
    if (input.current) {
      setIsValid(input.current.validity.valid);
      setValidationMessage(input.current.validationMessage);
      if (props.onButtonStatusChange !== undefined) {
        props.onButtonStatusChange(input.current.validity.valid);
      }
    }
  }

  useEffect(() => {
    validate();
  });

  return (
    <div className={props.wrapClasses}>
      <input
        className={props.className}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        required={props.required ? true : false}
        minLength={props.minLength}
        maxLength={props.maxLength}
        ref={input}
      />
      <span className={`popup__input_type_error ${(!isValid && props.isTouched) ? 'popup__error_visible' : ''}`}>
        {validationMessage}
      </span>
    </div>
  );
}