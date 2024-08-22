import auth from '@react-native-firebase/auth'
import Axios, { AxiosRequestConfig } from 'axios'
import ENV from '../config/env'

export const axiosInstance = Axios.create({ baseURL: ENV.apiUrl })

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await auth().currentUser?.getIdToken()
    if (accessToken) {
      // @ts-ignore
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const accessToken = await auth().currentUser?.getIdToken(true)
      axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + accessToken
      originalRequest.headers.Authorization = 'Bearer ' + accessToken
      return await axiosInstance(originalRequest)
    }
    return await Promise.reject(error)
  }
)

const apiInstance = {
  get: async <TResponse>(url: string, config?: AxiosRequestConfig) =>
    await axiosInstance.get<TResponse>(url, config).then((res) => res.data),
  post: async <TResponse>(url: string, body?: object, config?: any) =>
    await axiosInstance.post<TResponse>(url, body, config).then((res) => res.data),
  put: async <TResponse>(url: string, body?: object, config?: any) =>
    await axiosInstance.put<TResponse>(url, body, config).then((res) => res.data),
}

export default apiInstance
