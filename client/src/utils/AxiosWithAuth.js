import axios from 'axios';

export const axiosWithAuth = () => {
  // create a local token
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: `${import.meta.env.VITE_HOSTED_BACKEND}`,
    headers: {
      Authorization: token,
    },
  });
};
