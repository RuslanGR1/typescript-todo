import { FC, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { ITask } from "entities/task";
interface TaskItemProp extends ITask {
  onTaskClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onTaskOpen: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
}

const TaskItem: FC<TaskItemProp> = ({
  title,
  id,
  onTaskClick,
  onTaskDelete,
  onTaskOpen,
}) => {
  const [visible, setVisible] = useState(true);

  const onContextChange = (e: React.MouseEvent<HTMLElement>) => {
    setVisible((prev) => !prev);
    onTaskClick && onTaskClick(e);
  };

  return (
    <div
      onMouseLeave={() => setVisible(true)}
      onContextMenu={onContextChange}
      className="relative rounded bg-gray-200 my-2 p-2 shadow text-gray-600 hover:bg-gray-300 hover:text-white transition-all"
    >
      <Link className="" to={`task/${id}`}>
        {title}
      </Link>
      <div
        style={{ zIndex: "9" }}
        className={cn(
          "absolute right-1 top-1 z-9 bg-white text-white rounded p-1 w-[150px]",
          {
            hidden: visible,
          }
        )}
      >
        <div onMouseLeave={() => setVisible(true)} className="flex flex-col">
          <div
            onClick={() => onTaskDelete(id)}
            className="bg-gray-100 rounded cursor-pointer text-gray-700 hover:bg-gray-200 py-1 px-5 mb-1"
          >
            Удалить
          </div>
          <div
            onClick={() => onTaskOpen(id)}
            className="bg-gray-100 rounded cursor-pointer text-gray-700 hover:bg-gray-200 py-1 px-5 mb-1"
          >
            Открыть
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
