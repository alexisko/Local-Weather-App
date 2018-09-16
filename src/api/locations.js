import axios from 'axios';

export const fetchCurrentLocationApi = () => {
  return axios.get('https://ipinfo.io/json/');
};