import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITask } from 'entities/task'

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => `todos`,
    }),
    getTask: builder.query<ITask, string | undefined>({
      query: (taskId) => `todos/${taskId}`,
    }),
  }),
})

export const { useGetAllTasksQuery, useGetTaskQuery } = taskApi
