import axios from "axios";

const user = axios.create({ baseURL: "https://app.spiritx.co.nz/api" })
const token = window.localStorage.getItem("luxdream-yanfengYang-token")

export const request = ({ ...options }) => {
  console.log(token)
  user.defaults.headers.common.Token = token
  const onSuccess = (response) => response
  const onError = (error) => {
    return error
  }

  return user(options).then(onSuccess).catch(onError)
}

/* axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("luxdream-yanfengYang-token");
    token && { config.headers = { token: token } }
    return config;
  },
  error => {
    return Promise.error(error);
  }
); */