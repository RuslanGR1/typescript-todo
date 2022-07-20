import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { ITask, IColumn } from 'entities/task'

export const projectApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ["Columns", "Task"],
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => `tasks`,
      providesTags: ["Task"]
    }),
    getTask: builder.query<ITask, string | undefined>({
      query: (taskId) => `tasks/${taskId}`,
    }),
    addTask: builder.mutation<any, any>({
      query: (task: ITask) => ({
        url: 'tasks',
        method: 'post',
        body: task
      }),
      invalidatesTags: ["Task"]
    }),
    getTasksByColumn: builder.query({
      query: (columnId) => `tasks?columnId=${columnId}`,
      providesTags: ["Task"]
    }),
    getAllColumns: builder.query({
      query: () => ({ url: `columns` }),
      providesTags: ["Columns"],
    }),

    addColumn: builder.mutation<any, any>({
      query: (column: IColumn) => ({
        url: 'columns',
        method: 'post',
        body: column
      }),
      invalidatesTags: ["Columns"]
    })
  }),
})

export const {
  useGetAllTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useGetAllColumnsQuery,
  useGetTasksByColumnQuery,
  useLazyGetTasksByColumnQuery,
  useAddColumnMutation,
  useLazyGetAllColumnsQuery,
} = projectApi
