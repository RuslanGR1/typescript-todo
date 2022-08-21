import { apiSlice } from "store/slices/apiSlice";
import { IBoard } from "entities";

export const boardApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addBoard: builder.mutation<IBoard, IBoard>({
      query: (board: IBoard) => ({
        url: 'boards/',
        method: 'post',
        body: board
      }),
      invalidatesTags: [{ type: "Board", id: "NEW" }]
    }),

    getAllBoards: builder.query({
      query: () => ({
        url: `boards/`,
        credentials: 'include'
      }),
      providesTags: (returnValue, _args: any): any => {
        console.log("getAllBoards", { returnValue, _args });

        if (returnValue) {
          return [...returnValue.map(
            (board: IBoard) => ({ type: 'Board', id: board.id })), { type: "Board", id: "NEW" }]
        } else {
          return { type: "Board" }
        }

      }
    }),
  })
})

export const {
  useAddBoardMutation,
  useGetAllBoardsQuery
} = boardApi
