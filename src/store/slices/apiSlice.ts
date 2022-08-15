import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from 'features/auth/authSlice'
import axios from 'axios'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token
    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    // send refresh token to get new access token 
    const refresh = localStorage.getItem("refresh")
    const refreshResult = await axios.post("http://localhost:5000/api/v1/auth/token/refresh", { refresh })
    if (refreshResult?.data) {
      // store the new token 
      api.dispatch(setCredentials({ data: refreshResult.data }))
      // retry the original query with new access token 
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Columns", "Tasks", "Boards", "Drag"],
  endpoints: _builder => ({})
})
