export const isLoggedIn = () => {
  // eslint-disable-next-line prefer-const
  let value = window.localStorage.getItem('token');
  if (value == null) {
    return false;
  }
  return true;
};
