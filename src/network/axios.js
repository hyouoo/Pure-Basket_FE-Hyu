import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const defaultInstance = axios.create({
  baseURL: BASE_URL,
});

export const createJwtInstance = (token) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });
  return instance;
};
