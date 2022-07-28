import {
  useGetAllBoardsQuery
} from "store/api";
import { BoardItem, BoardList } from "shared/ui/Board";
import type { IBoard } from "entities";
// import { v4 as uuid } from "uuid";

const HomePage = () => {
  const { data: boards } = useGetAllBoardsQuery("");

  return (
    <BoardList boards={boards} />
  );
};

export default HomePage;
