import { apiSlice } from "store/slices/apiSlice";
import { IColumn } from "entities";

export const columnApi = apiSlice.injectEndpoints({
  endpoints: builder => ({

    getColumnsByBoard: builder.query({
      query: (boardId) => `columns/?boardId=${boardId}`,
      providesTags: (returnValue, _args: any): any => {
        console.log("getColumnsByBoard", { returnValue, _args });

        if (returnValue) {
          return [{ type: "Column", id: "NEW" }, ...returnValue.map(
            (column: IColumn) => ({ type: 'Column', id: column.id }))]
        } else {
          return { type: 'Column' }
        }

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

        return [{ type: "Board", id: returnValue.board }, { type: "Column", id: "NEW" }]
      }
    }),
  })
})

export const {
  useGetColumnsByBoardQuery,
  useAddColumnMutation,
} = columnApi
