import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setCredentials, logOut } from 'features/auth/authSlice'
import makeApiRequest from 'shared/utils/makeApiRequest'
import { RootState } from 'store'
import location from 'shared/utils/location'

const baseUrl = 'http://localhost:5000/api/v1'

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
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
    
    if (!refresh) {
      //location.login()
      return result
    }

    const refreshResult = await makeApiRequest({
      url: `${baseUrl}/auth/token/refresh`,
      method: 'post',
      data: { refresh }
    })

    if (refreshResult?.data) {
      // store the new token 
      api.dispatch(setCredentials({ data: refreshResult.data }))
      // retry the original query with new access token 
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logOut())
      location.login()
    }
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Column", "Task", "Board", "Drag"],
  endpoints: _builder => ({})
})
