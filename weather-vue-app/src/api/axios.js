import axios from "axios";

const API_KEY = process.env.API_KEY;
const LOCAL = "Kiev" ?? "Brovary";

axios.defaults.baseURL = `https://api.weatherapi.com/v1/current.json?${API_KEY}&${LOCAL}`;

export default axios;
