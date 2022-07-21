import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { ITask, IColumn } from 'entities/task'

export const projectApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ["Columns", "Task", "Boards"],
  endpoints: (builder) => ({

    getAllBoards: builder.query({
      query: () => `boards`,
      providesTags: ["Boards"]
    }),

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

    removeTask: builder.mutation<any, any>({
      query: (taskId: string) => ({
        url: `tasks/${taskId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Task"]
    }),

    getTasksByColumn: builder.query({
      query: (columnId) => `tasks?columnId=${columnId}`,
      providesTags: ["Task"]
    }),

    getColumnsByBoard: builder.query({
      query: (boardId) => `columns?boardId=${boardId}`,
      providesTags: ["Boards"]
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
  useRemoveTaskMutation,
  useGetAllBoardsQuery,
  useGetColumnsByBoardQuery
} = projectApi
