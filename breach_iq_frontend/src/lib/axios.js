import axios from "axios";
import { backend_base_url } from "./constants";

const axiosInstance = axios.create({
  baseURL: backend_base_url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // include cookies in requests
});

export default axiosInstance;
