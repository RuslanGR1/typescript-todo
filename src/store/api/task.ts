import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IBoard } from 'entities';

import type { ITask, IColumn } from 'entities/task'

const baseUrl: string = 'http://localhost:5000/'

export const taskApi = createApi({
	reducerPath: 'taskApi',
	baseQuery: fetchBaseQuery({ baseUrl }),
	tagTypes: ["Columns", "Tasks", "Boards", "Drag"],
	endpoints: (builder) => ({
		getAllTasks: builder.query({
			query: () => `tasks`,
			providesTags: ["Tasks"],
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
				console.log("dragTask", { returnValue, error, args });

				return [
					{ type: "Tasks", id: args.task.columnId },
					{ type: "Tasks", id: args.targetColumnId }
				]
			}
		}),

		removeTask: builder.mutation<any, any>({
			query: ({ taskId, columnId }: { taskId: string, columnId: string }) => ({
				url: `tasks/${taskId}`,
				method: 'DELETE'
			}),
			invalidatesTags: (returnValue, something, args): any => {
				console.log("removeTask", { returnValue, something, args });

				return [{ type: "Tasks", id: args.columnId }]
			}
		}),
	})
})
