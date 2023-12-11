import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/atoms';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const defaultInstance = axios.create({
  baseURL: BASE_URL,
});
