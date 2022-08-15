import { apiSlice } from "store/slices/apiSlice";
import { ITask } from "entities";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTasksByColumn: builder.query<ITask[], any>({
      query: (columnId) => `tasks?columnId=${columnId}`,
      providesTags: (returnValue, _args: any): any => {
        console.log("getTasksByColumn", { returnValue, _args });
        // uniqTaskByClumn(returnValue)
        return returnValue && returnValue.map((task: ITask) => ({ type: "Tasks", id: task.columnId }))
      }
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

    dragTask: builder.mutation<ITask, any>({
      query: ({ targetColumnId, task }: { targetColumnId: string; task: ITask }) => ({
        url: `tasks/${task.id}/`,
        method: 'patch',
        body: { column: targetColumnId }
      }),
      invalidatesTags: (returnValue: any, error: any, args: any): any[] => {
        console.log("dragTask", { returnValue, error, args });

        return [
          { type: "Tasks", id: args.task.columnId },
          { type: "Tasks", id: args.targetColumnId }
        ]
      }
    })
  })
})

export const {
  useGetTasksByColumnQuery,
  useGetAllTasksQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useDragTaskMutation,
  useUpdateTaskMutation,
} = taskApi