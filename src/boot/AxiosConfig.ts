import { Axios } from "axios";

const api = new Axios({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});



export default api;
