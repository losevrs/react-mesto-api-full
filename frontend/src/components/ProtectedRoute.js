import React from 'react';
import { Route, Redirect } from "react-router-dom";

export default (props) => {
  return (
    <Route path={props.path}>
      {() => props.loggedIn === true
        ? <>
          {props.children}
        </>
        : <Redirect to='/sign-in' />
      }
    </Route>
  )
}
