import axios from 'axios';

const key = 'c768d4a88b0b5de357d4f616162c72ab';

export const fetchCurrentWeatherApi = location => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`;
  return axios.get(url);
};

export const fetchThreeDayWeatherApi = location => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${key}`;
  return axios.get(url);
};