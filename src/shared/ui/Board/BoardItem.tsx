import { IBoard } from "entities/board";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface Props {
  board: IBoard;
}

export const BoardItem: FunctionComponent<Props> = ({ board }) => {
  return (
    <Link
      className="shadow rounded hover:shadow-lg bg-gray-100 min-h-[120px] min-w-[300px] max-w-[300px] block text-gray-900 p-4"
      to={`board/${board?.id}`}
    >
      {board?.title}
    </Link>
  );
};
