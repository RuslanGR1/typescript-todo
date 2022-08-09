import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IBoard } from 'entities';

import type { ITask, IColumn } from 'entities/task'

const baseUrl: string = 'http://localhost:5000/api/v1/'

export const projectApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Columns", "Tasks", "Boards", "Drag"],
  endpoints: (builder) => ({

    getAllBoards: builder.query({
      query: () => `boards/`,
      providesTags: (result: any, error: any, arg: any): any[] => {
        console.log("getAllBoards", { result, error, arg });

        if (result) {
          return result.map(({ id }: { id: string }) => ({ type: "Boards" as const, id }))
        } else {
          return ["Boards"]
        }
      }
    }),

    addBoard: builder.mutation<IBoard, IBoard>({
      query: (board: IBoard) => ({
        url: 'boards/',
        method: 'post',
        body: board,
      }),
      invalidatesTags: ["Boards"]
    }),

    getTask: builder.query<ITask, string | undefined>({
      query: (taskId) => `tasks/${taskId}`,
      providesTags: (returnValue: any, args: any) => [{ type: "Columns", id: returnValue.id }]
    }),

    addTask: builder.mutation<any, any>({
      query: (task: ITask) => ({
        url: 'tasks/',
        method: 'post',
        body: task
      }),
      invalidatesTags: (returnValue: any, error: any, args: any): any[] => {
        console.log("addTask", { returnValue, error, args });

        return [{ type: "Columns", id: returnValue.column }]
      }
    }),

    updateTask: builder.mutation<any, any>({
      query: ({ task }: { task: ITask }) => ({
        url: `tasks/${task.id}/`,
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
        url: `tasks/${taskId}/`,
        method: 'DELETE'
      }),
      invalidatesTags: (returnValue, something, args): any => {
        console.log("removeTask", { returnValue, something, args });

        return [{ type: "Tasks", id: args.columnId }]
      }
    }),

    getTasksByColumn: builder.query<ITask[], any>({
      query: (columnId) => `tasks/?columnId=${columnId}`,
      providesTags: (returnValue, _args: any): any => {
        console.log("getTasksByColumn", { returnValue, _args });

        if (returnValue) {
          return returnValue.map(({ id }: { id: string }) => ({ type: "Columns" as const, id }))
        } else {
          return ["Columns"]
        }
      }
    }),

    getColumnsByBoard: builder.query({
      query: (boardId) => `columns/?boardId=${boardId}`,
      providesTags: (returnValue, _args: any): any => {
        console.log("getColumnsByBoard", { returnValue, _args });

        if (returnValue) {
          return returnValue.map(({ id }: { id: string }) => ({ type: "Boards" as const, id }))
        } else {
          return ["Boards"]
        }
      }
    }),

    getAllColumns: builder.query({
      query: () => ({ url: `columns/` }),
      providesTags: (result: any, error: any, arg: any): any[] => {
        console.log("getAllColumns", { result, error, arg });

        if (result) {
          return result.map(({ id }: { id: string }) => ({ type: "Columns" as const, id }))
        } else {
          return ["Columns"]
        }
      }
    }),

    addColumn: builder.mutation<any, any>({
      query: (column: IColumn) => ({
        url: 'columns/',
        method: 'post',
        body: column
      }),
      invalidatesTags: (returnValue: any, error: any, args: any): any[] => {
        console.log("addColumn", { returnValue, error, args });

        return [{ type: "Boards", id: returnValue.board }]
      }
    }),

    dragTask: builder.mutation<ITask, any>({
      query: ({ targetColumnId, task }: { targetColumnId: string; task: ITask }) => ({
        url: `tasks/${task.id}/`,
        method: 'patch',
        body: { column: targetColumnId }
      }),
      invalidatesTags: (returnValue: any, error: any, args: any): any[] => {
        return [
          { type: "Tasks", id: args.task.columnId },
          { type: "Tasks", id: args.targetColumnId }
        ]
      }
    })
  }),
})

export const {
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


const getSrc = (initialItem, src = []) => {
  const entity = initialItem.entity

  src = _.concat([entity, `${entity}Id`], src)

  const parent = _.find(crud, item => item["parnet"] === parent)

  if (parent) {
    return getSrc(parent, src)
  } else {
    return src
  }
}

const makeSrc = (initialItem, params) => {
  const src = getSrc(initialItem)

  // 
  return _
  .chain(src)
  .map((elemnt) => params[element] ? params[element] : elemnt)
  .join("/")
  .values()
}

const construcFn = (builder, entity, method, parent, extraTags) => {
  const endPoints = {}

  switch (method) {
    case "get":

      const getSrc

      const getAllFn = builder.query({
        query: () => `${entity}/`,
        providesTags: (result: any, error: any, arg: any): any[] => {
          console.log("getAllBoards", { result, error, arg });

          if (result) {
            return [...result.map(({ id }: { id: string }) => ({ type: entity, id })), entity]
          } else {
            return [entity]
          }
        }
      })

      const getFn = builder.query({
        query: (id: string) => `${entity}/${id}`,
        providesTags: (result: any, error: any, arg: any): any[] => {
          console.log("getAllBoards", { result, error, arg });

          if (result) {
            return [...result.map(({ id }: { id: string }) => ({ type: entity, id })), entity]
          } else {
            return [entity]
          }
        }
      })




      break;

    case "post":

      break;

    case "delete":

      break;

    case "update":

      break;

    default:
      break;
  }
} 