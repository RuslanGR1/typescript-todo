import { apiSlice } from "store/slices/apiSlice";
import { IBoard } from "entities";

export const boardApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addBoard: builder.mutation<IBoard, IBoard>({
      query: (board: IBoard) => ({
        url: 'boards/',
        method: 'post',
        body: board
      })
    }),

    getAllBoards: builder.query({
      query: () => ({
        url: `boards/`,
        credentials: 'include'
      }),
      providesTags: ["Boards"]
    }),
  })
})

export const {
  useAddBoardMutation,
  useGetAllBoardsQuery
} = boardApi
