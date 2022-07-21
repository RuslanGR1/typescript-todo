import {
  useGetAllBoardsQuery
} from "store/api";
import { BoardItem } from "shared/ui/BoardItem";
import type { IBoard } from "entities";
// import { v4 as uuid } from "uuid";

const HomePage = () => {
  const { data: boards } = useGetAllBoardsQuery("");

  return (
    <div className="mt-5 mx-auto flex flex-col">
      <div>
        {boards?.map((board: IBoard) => (
          <BoardItem key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
