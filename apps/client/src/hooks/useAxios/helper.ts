import axios from "axios";
import { AUTH_SERVER_URI } from "../../helper/global";

export const axiosInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: AUTH_SERVER_URI,
    timeout: 1000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
