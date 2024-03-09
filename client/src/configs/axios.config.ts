import axios from "axios";
export const PrivateAxios = axios.create({
  baseURL: "https://pj-ftt6.onrender.com",
});
// axios.defaults.withCredentials = true;
// PrivateAxios.defaults.withCredentials = true;
PrivateAxios.interceptors.request.use(
  async (config: any) => {
    let token;
    try {
      token = localStorage.getItem("token");
    } catch (error) {}
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

PrivateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const PublicAxios = axios.create({
  baseURL: "https://pj-ftt6.onrender.com",
});
// axios.defaults.withCredentials = true;
// PublicAxios.defaults.withCredentials = true;
