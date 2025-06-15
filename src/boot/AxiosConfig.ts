import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

const viaCep = axios.create({
  baseURL: "https://viacep.com.br/ws/01001000/json/",
});

export default api;
