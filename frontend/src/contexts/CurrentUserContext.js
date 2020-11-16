import React, { useContext } from 'react'

const CurrentUserContext = React.createContext();

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
}

export const CurrentUserContextProvider = (props) => {
  return (
    <CurrentUserContext.Provider value={props.value}>
      {props.children}
    </CurrentUserContext.Provider>
  );
}