import { IBoard } from "entities";
import { BoardItem } from "./BoardItem";
import { FC } from "react";

interface Props {
  boards: IBoard[];
}

const BoardList: FC<Props> = (props) => {
  const { boards } = props;
  return (
    <ul className={"flex items-center flex-wrap gap-3"}>
      {boards?.map((board: IBoard) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </ul>
  );
};

export { BoardList };
