import { apiSlice } from "store/slices/apiSlice";
import { IColumn } from "entities";

export const columnApi = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getColumnsByBoard: builder.query({
      query: (boardId) => `columns?boardId=${boardId}`,
      providesTags: (returnValue, _args: any): any => {
        console.log("getColumnsByBoard", { returnValue, _args });

        return returnValue.map(
          (column: IColumn) => ({ type: 'Columns', id: column.boardId }))
      }
    }),

    getAllColumns: builder.query({
      query: () => ({ url: `columns/` }),
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
  })
})

export const {
  useGetAllColumnsQuery,
  useGetColumnsByBoardQuery,
  useAddColumnMutation,
} = columnApi
