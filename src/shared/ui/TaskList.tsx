import { Link } from "react-router-dom";
import React, { FC } from "react";
import { useGetAllTasksQuery } from "store/api";
import { ITask } from "entities/task";

interface TaskItemProp extends ITask {}

const TaskItem: FC<TaskItemProp> = ({ title, id }) => (
  <div className="rounded bg-gray-400 my-1 p-2 shadow text-white hover:bg-gray-300 hover:text-gray-600 transition-all">
    <Link className="" to={`task/${id}`}>
      {title}
    </Link>
  </div>
);

const TaskList = () => {
  const { data: todos } = useGetAllTasksQuery("");

  return (
    <div className="w-[450px] bg-gray-100 overflow-y-auto flex flex-col p-3 min-h-[600px] h-[600px] rounded shadow">
      {todos?.map((todo: ITask) => (
        <TaskItem key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TaskList;
