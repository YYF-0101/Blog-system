import { setupInterceptorsTo } from "./Interceptor"
import { BaseUrl } from "./environment"
import axios from "axios"

const axiosInstance = setupInterceptorsTo(axios.create())

export const apiGet = async path => axiosInstance.get(`${BaseUrl}${path}`)
export const apiPost = async (path, data) => axiosInstance.post(`${BaseUrl}${path}`, data)
export const apiPut = async (path, data) => axiosInstance.post(`${BaseUrl}${path}`, data)
export const apiDelete = async path => axiosInstance.delete(`${BaseUrl}${path}`)
