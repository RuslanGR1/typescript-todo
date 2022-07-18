import { Link } from "react-router-dom";
import React from "react";

const TaskItem = () => (
  <div className="rounded bg-gray-400 my-1 p-2 shadow text-white hover:bg-gray-300 hover:text-gray-600 transition-all">
    <Link className="" to="/">
      Item1
    </Link>
  </div>
);

const TaskList = () => {
  return (
    <div className="w-[450px] bg-gray-100 overflow-y-auto flex flex-col p-3 min-h-[600px] h-[600px] rounded shadow">
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />
      <TaskItem />

    </div>
  );
};

export default TaskList;
