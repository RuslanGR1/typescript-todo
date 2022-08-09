import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IBoard } from 'entities';

import type { ITask, IColumn } from 'entities/task'

const baseUrl: string = 'http://localhost:5000/api/v1/'

export const projectApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Columns", "Tasks", "Boards", "Drag"],
  endpoints: (builder) => ({

    addBoard: builder.mutation<IBoard, IBoard>({
      query: (board: IBoard) => ({
        url: 'boards/',
        method: 'post',
        body: board,
      })
    }),

    getAllBoards: builder.query({
      query: () => `boards/`,
      providesTags: ["Boards"]
    }),

    getAllTasks: builder.query({
      query: () => `tasks/`,
      providesTags: ["Tasks"],
    }),

    getTask: builder.query<ITask, string | undefined>({
      query: (taskId) => `tasks/${taskId}`,
      providesTags: (returnValue: any, args: any) => [{ type: "Tasks", id: returnValue.id }]
    }),

    addTask: builder.mutation<any, any>({
      query: (task: ITask) => ({
        url: 'tasks/',
        method: 'post',
        body: task
      }),
      invalidatesTags: (returnValue, something, args): any => {
        console.log("addTask", { returnValue, something, args });

        return [{ type: "Tasks", id: returnValue.columnId }]
      }
    }),

    updateTask: builder.mutation<any, any>({
      query: ({ task }: { task: ITask }) => ({
        url: `tasks/${task.id}`,
        method: 'put',
        body: { ...task }
      }),
      invalidatesTags: (returnValue: any, error: any, args: any): any[] => {
        console.log("updateTask", { returnValue, error, args });

        return [
          { type: "Tasks", id: args.task.columnId },
          { type: "Tasks", id: args.targetColumnId }
        ]
      }
    }),

    removeTask: builder.mutation<ITask, any>({
      query: ({ taskId, columnId }: { taskId: string, columnId: string }) => ({
        url: `tasks/${taskId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (returnValue, something, args): any => {
        console.log("removeTask", { returnValue, something, args });

        return [{ type: "Tasks", id: args.columnId }]
      }
    }),

    getTasksByColumn: builder.query<ITask[], any>({
      query: (columnId) => `tasks?columnId=${columnId}`,
      providesTags: (returnValue, _args: any): any => {
        console.log("getTasksByColumn", { returnValue, _args });
        // uniqTaskByClumn(returnValue)
        return returnValue && returnValue.map((task: ITask) => ({ type: "Tasks", id: task.columnId }))
      }
    }),

    getColumnsByBoard: builder.query({
      query: (boardId) => `columns?boardId=${boardId}`,
      providesTags: (returnValue, _args: any): any => {
        console.log("getColumnsByBoard", { returnValue, _args });

        return returnValue.map(
          (column: IColumn) => ({ type: 'Columns', id: column.boardId }))
      }
    }),

    getAllColumns: builder.query({
      query: () => ({ url: `columns` }),
      providesTags: (returnValue, _args: any): any => {
        console.log("getAllColumns", { returnValue, _args });
        return returnValue.map(
          (column: IColumn) => ({ type: 'Columns', id: column.id }))
      }
    }),

    addColumn: builder.mutation<any, any>({
      query: (column: IColumn) => ({
        url: 'columns/',
        method: 'post',
        body: column
      }),
      invalidatesTags: ["Boards"]
    }),

    dragTask: builder.mutation<ITask, any>({
      query: ({ targetColumnId, task }: { targetColumnId: string; task: ITask }) => ({
        url: `tasks/${task.id}`,
        method: 'put',
        body: { ...task, columnId: targetColumnId }
      }),
      invalidatesTags: (returnValue: any, error: any, args: any): any[] => {
        console.log("dragTask", { returnValue, error, args });

        return [
          { type: "Tasks", id: args.task.columnId },
          { type: "Tasks", id: args.targetColumnId }
        ]
      }
    })
  }),
})

export const {
  useGetAllTasksQuery,
  useGetTaskQuery,
  useGetAllColumnsQuery,
  useGetTasksByColumnQuery,
  useLazyGetTasksByColumnQuery,
  useLazyGetAllColumnsQuery,
  useGetAllBoardsQuery,
  useGetColumnsByBoardQuery,

  useDragTaskMutation,
  useAddBoardMutation,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useAddColumnMutation,
  useUpdateTaskMutation,
} = projectApi
