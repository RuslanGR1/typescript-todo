import { apiSlice } from "store/slices/apiSlice";
import { IColumn } from "entities";

export const columnApi = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getColumnsByBoard: builder.query({
      query: (boardId) => `columns/?boardId=${boardId}`,
      providesTags: (returnValue, err, boardId: any): any => {
        console.log("getColumnsByBoard", { returnValue, err, boardId });

        return [{ type: "Columns", id: boardId }]
      }
    }),

    addColumn: builder.mutation<any, any>({
      query: (column: IColumn) => ({
        url: 'columns/',
        method: 'post',
        body: column
      }),
      invalidatesTags: (returnValue: any, error: any, args: any): any => {
        console.log("addColumn", { returnValue, error, args });

        return [{ type: "Columns", id: args.board }]
      }
    }),
  })
})

export const {
  useGetColumnsByBoardQuery,
  useAddColumnMutation,
} = columnApi
