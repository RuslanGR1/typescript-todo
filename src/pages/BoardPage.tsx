import { FC, useState } from "react";

import { useParams } from "react-router-dom";
import { TaskList } from "../shared/ui/Task";
import {
  useAddColumnMutation,
  useGetColumnsByBoardQuery,
} from "store/api";
import type { IColumn } from "entities";
import cn from "classnames";
import { v4 as uuid } from "uuid";

interface Props { }

const BoardPage: FC<Props> = () => {
  const { boardId } = useParams();
  const [setColumn] = useAddColumnMutation();
  const { data: columns } = useGetColumnsByBoardQuery(boardId);
  const [newColTask, setNewColTask] = useState("");

  const addColumn = () => {
    if (!newColTask || !boardId) return;

    const _column: IColumn = {
      id: uuid(),
      title: newColTask,
      description: "",
      boardId: boardId,
    };
    setColumn(_column);
    setNewColTask("");
  };

  return (
    <div className="mt-5 mx-auto flex flex-col">
      {/* <TaskSearch />
      <TaskFilter /> */}
      <div className="flex overflow-x-auto">
        {boardId &&
          columns?.map((column: IColumn) => (
            <TaskList
              key={column.id}
              title={column.title}
              boardId={boardId}
              columnId={column.id}
            />
          ))}
        <div
          className={cn(
            "h-fit min-w-[250px] w-[300px] bg-gray-100 overflow-y-auto flex h-content flex-col p-2 rounded shadow mx-2"
          )}
        >
          <button
            onClick={() => addColumn()}
            className="mt-2 bg-gray-500 text-white py-2 rounded shadow hover:text-gray-500
             hover:bg-white hover:border-gray-500 hover:shadow-lg trasition-all"
          >
            + Add
          </button>
          <input
            placeholder="Введите заголовок списка"
            type="text"
            value={newColTask}
            onChange={(e) => setNewColTask(e.target.value)}
            className="p-2 mt-2 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
