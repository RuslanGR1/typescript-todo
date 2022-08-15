import { apiSlice } from "store/slices";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: '/auth/token/',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    register: builder.mutation({
      query: (credentials: any) => ({
        url: '/auth/token/register',
        method: 'POST',
        body: { ...credentials }
      })
    }),
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
} = authApiSlice
