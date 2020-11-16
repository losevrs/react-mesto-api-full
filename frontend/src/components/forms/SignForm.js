import React from 'react'
import { Link } from 'react-router-dom'

import InfoTooltip from '../popups/InfoTooltip';

export default (props) => {

  let enabled = true;
  if (props.buttonEnabled !== undefined) {
    enabled = props.buttonEnabled;
  }

  return (
    <>
      <form className='signform'
        action='#'
        method='POST'
        name={`${props.name}`}
        noValidate
        onSubmit={props.onSubmit} >

        <h2 className='signform__title'>{`${props.title}`}</h2>

        {props.children}

        <button
          className={`signform__submit ${enabled ? '' : 'signform__submit_disabled'}`}
          disabled={enabled ? '' : 'disabled'}
          type='submit'>{props.buttonTitle}</button>

        {props.linkTo
          ? <Link to={props.linkTo} className='signform__link'>{props.linkText}</Link>
          : null
        }
      </form >
      <InfoTooltip
        isOpened={props.showInfo}
        onClose={props.closeInfo}
        isSuccess={props.success}
      />
    </>
  );
}
