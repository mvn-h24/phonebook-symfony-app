import axios from "axios";

export function initAxios() {
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.baseURL = "http://127.0.0.1:8000";
}
