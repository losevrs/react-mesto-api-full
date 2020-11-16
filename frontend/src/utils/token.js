const AUTH_TYPE = 'jwt';

const tokenGet = () => localStorage.getItem(AUTH_TYPE);
const tokenDelete = () => localStorage.removeItem(AUTH_TYPE);
const tokenSet = (token) => localStorage.setItem(AUTH_TYPE, token);

export {
  tokenSet,
  tokenGet,
  tokenDelete,
  AUTH_TYPE
}