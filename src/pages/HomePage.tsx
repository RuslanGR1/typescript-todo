import React, { useState } from "react";

import TaskFilter from "../shared/ui/TaskFilter";
import TaskSearch from "../shared/ui/TaskSearch";
import TaskList from "../shared/ui/TaskList";
import {
  useAddColumnMutation,
  useGetAllColumnsQuery,
  useLazyGetAllColumnsQuery,
} from "store/api";
import type { IColumn } from "entities/task";
import cn from "classnames";
import { v4 as uuid } from "uuid";

const HomePage = () => {
  const [setColumn] = useAddColumnMutation();
  const { data: columns } = useGetAllColumnsQuery("");
  console.log("columns", columns);

  const [newColTask, setNewColTask] = useState("");
  const [getColumnsLazy] = useLazyGetAllColumnsQuery();
  console.log(uuid());

  const addColumn = async () => {
    if (!newColTask) return;
    
    const _column: IColumn = {
      id: uuid(),
      title: newColTask,
      description: "",
    };
    await setColumn(_column);
    await getColumnsLazy(true);
    setNewColTask("");
  };

  console.log("columns", columns);

  return (
    <div className="container mt-5 mx-auto flex flex-col">
      {/* <TaskSearch />
      <TaskFilter /> */}
      <div className="flex">
        {columns?.map((column: IColumn) => (
          <TaskList title={column.title} columnId={column.id} />
        ))}
        <div
          className={cn(
            "h-fit w-[300px] bg-gray-100 overflow-y-auto flex h-content flex-col p-2 rounded shadow mx-2"
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

export default HomePage;
