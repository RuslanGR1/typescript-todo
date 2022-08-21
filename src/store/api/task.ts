import { apiSlice } from "store/slices/apiSlice";
import { ITask } from "entities";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getTasksByColumn: builder.query<ITask[], any>({
      query: (columnId) => `tasks/?columnId=${columnId}`,
      providesTags: (returnValue: any, _args: any): any => {
        console.log("getTasksByColumn", { returnValue, _args });
        // uniqTaskByClumn(returnValue)
        if (returnValue) {
          return [{ type: "Task", id: "NEW" }, ...returnValue.map((task: ITask) => ({ type: "Task", id: task.id }))]
        } else {
          return [{ type: "Task" }]
        }
      }
    }),

    getTask: builder.query<ITask, string | undefined>({
      query: (taskId) => `tasks/${taskId}`,
      providesTags: (returnValue: any, args: any): any => [{ type: "Task", id: returnValue.id }]
    }),

    addTask: builder.mutation<any, any>({
      query: (task: ITask) => ({
        url: 'tasks/',
        method: 'post',
        body: task
      }),
      invalidatesTags: (returnValue, something, args): any => {
        console.log("addTask", { returnValue, something, args });

        return [{ type: "Column", id: returnValue.column }, { type: "Task", id: "NEW" }]
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
          { type: "Column", id: returnValue.column },
          { type: "Task", id: returnValue.id }
        ]
      }
    }),

    removeTask: builder.mutation<ITask, any>({
      query: ({ taskId }: { taskId: string }) => ({
        url: `tasks/${taskId}/`,
        method: 'DELETE'
      }),
      invalidatesTags: (returnValue, something, args): any => {
        console.log("removeTask", { returnValue, something, args });

        return [{ type: "Task", id: args.taskId }]
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
          { type: "Column", id: args.task.column },
          { type: "Column", id: args.targetColumnId },
          { type: "Task", id: args.task.id },
        ]
      }
    })
  })
})

export const {
  useGetTasksByColumnQuery,
  useGetTaskQuery,
  useAddTaskMutation,
  useRemoveTaskMutation,
  useDragTaskMutation,
  useUpdateTaskMutation,
} = taskApi