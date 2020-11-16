import React, { useContext } from 'react'

const AuthDataContext = React.createContext();

export const useAuthDataContext = () => {
  return useContext(AuthDataContext);
}

export const AuthDataContextProvider = (props) => {
  return (
    <AuthDataContext.Provider value={props.value}>
      {props.children}
    </AuthDataContext.Provider>
  );
}