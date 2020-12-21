import axios from 'axios';

export const axiosWithAuth = () => {
  // create a local token
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: `${process.env.REACT_APP_HOSTED_BACKEND}`,
    headers: {
      Authorization: token,
    },
  });
};
