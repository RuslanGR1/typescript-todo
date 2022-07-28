import { IBoard } from "entities/board";
import { BoardItem } from "./BoardItem";
import { FC } from "react";


interface Props {
  boards: IBoard[]
}

const BoardList: FC<Props> = (props) => {
  const { boards } = props;
  return (
    <ul className={"flex items-center"}>
      {boards?.map((board: IBoard) => (
        <BoardItem key={board.id} board={board} />
      ))}
    </ul>
  );
}

export { BoardList };
