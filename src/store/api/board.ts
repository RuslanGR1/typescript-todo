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
      invalidatesTags: (result: any, err, args) => {
        console.log("addBoard", { result, err, args });

        return [{ type: "Boards" }]
      }
    }),

    getAllBoards: builder.query({
      query: () => ({
        url: `boards/`,
        credentials: 'include'
      }),
      providesTags: (result: any, error, arg): any => {
        console.log("getAllBoards", { result, error, arg });

        return [{ type: "Boards" }]
      }
    }),
  })
})

export const {
  useAddBoardMutation,
  useGetAllBoardsQuery
} = boardApi
