import { IBoard } from "entities/board";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface Props {
  board: IBoard;
}

export const BoardItem: FunctionComponent<Props> = ({ board }) => {
  return (
    <Link
      className="shadow rounded-xl bg-gray-500 hover:bg-gray-400 min-h-[120px] min-w-[300px] max-w-[300px] block text-white p-4 m-2"
      to={`board/${board?.id}`}
    >
      {board?.title}
    </Link>
  );
};
