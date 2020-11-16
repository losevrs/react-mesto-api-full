const USER_EMAIL = 'usermail';

const emailGet = () => localStorage.getItem(USER_EMAIL);
const emailDelete = () => localStorage.removeItem(USER_EMAIL);
const emailSet = (token) => localStorage.setItem(USER_EMAIL, token);

export {
  emailSet,
  emailGet,
  emailDelete,
  USER_EMAIL
}