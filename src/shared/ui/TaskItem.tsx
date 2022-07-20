import { ITask } from "entities/task";
import { FC } from "react";
import { Link } from "react-router-dom";

interface TaskItemProp extends ITask {
  info?: string;
}

const TaskItem: FC<TaskItemProp> = ({ title, id }) => (
  <div className="rounded bg-gray-200 my-2 p-2 shadow text-gray-600 hover:bg-gray-300 hover:text-white transition-all">
    <Link className="" to={`task/${id}`}>
      {title}
    </Link>
  </div>
);

export default TaskItem;
