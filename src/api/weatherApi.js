import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const client = axios.create({
  baseURL: BASE_URL,
  params: { key: API_KEY },
});

export const searchCities = (query) =>
  client.get('/search.json', { params: { q: query } });

export const getForecast = (city, days = 3) =>
  client.get('/forecast.json', {
    params: { q: city, days, aqi: 'no', alerts: 'no' },
  });
