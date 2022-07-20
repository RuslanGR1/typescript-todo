import { IBoard } from "entities/board";
import { BoardItem } from "shared/ui/BoardItem";
import { FC } from "react";


interface Props {
  boards: IBoard[]
}

const BoardList: FC<Props> = (props) => {
  const { boards } = props;
  return (
    <ul>
      {
        boards.map((board) => <BoardItem key={board.id} board={board} />)
      }
    </ul>
  );
}

export default BoardList;