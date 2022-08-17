import { BaseUrl } from "./environment";

const token = localStorage.getItem('luxdream-yanfengYang-token')

const onRequest = (config) => {
  config = {
    ...config, BaseUrl
  }
  if (!config.url?.includes("login")) {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        token,
      }
    }
    return newConfig
  }
  return config
}

const onRequestError = (error) => {
  console.log(error)
  return error
}

const onResponse = (response) => {
  return response
}

const onResponseError = (error) => {
  console.log(error)
  return error
}

export const setupInterceptorsTo = (axiosInstance) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
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