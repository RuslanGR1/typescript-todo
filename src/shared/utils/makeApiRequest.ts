import axios, { AxiosRequestConfig } from "axios";

export default async ({
  method,
  url,
  data,
  params,
  headers,
  baseURL = "http://localhost:5000",
}: AxiosRequestConfig) => {
  const access = localStorage.getItem('access')
  const response = await axios({
    baseURL,
    method,
    url,
    data,
    headers: { ...headers, Authorization: 'Bearer ' + access },
    params
  })

  if (response.status === 401) {
    console.log("unathorized")
    // location.login()
  }
  return response
}
