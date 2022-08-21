import { FC, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { useDrag } from "react-dnd";

import MenuAlt from "shared/icons/MenuAlt";
import { useDragTaskMutation } from "store/api";
import { ITask } from "entities";

interface TaskItemProp {
  onTaskClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onTaskOpen: (taskId: string) => void;
  onTaskDelete: (taskId: string, columnId: string) => void;
  task: ITask;
}

const TaskItem: FC<TaskItemProp> = ({
  task,
  onTaskClick,
  onTaskDelete,
  onTaskOpen,
}) => {
  const [onDrag] = useDragTaskMutation();
  const [visible, setVisible] = useState(true);
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    // "type" is required. It is used by the "accept" specification of drop targets.
    type: "BOX",
    // The collect function utilizes a "monitor" instance (see the Overview for what this is)
    // to pull important pieces of state from the DnD system.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item: any, monitor) {
      const { columnId: targetColumnId }: any = monitor.getDropResult();

      onDrag({ targetColumnId, task });
    },
  }));

  const onContextChange = (e: React.MouseEvent<HTMLElement>) => {
    setVisible((prev) => !prev);
    onTaskClick && onTaskClick(e);
  };

  return (
    <div
      ref={drag}
      style={{ backgroundColor: isDragging ? "black" : "white" }}
      onMouseLeave={() => setVisible(true)}
      onContextMenu={onContextChange}
      className={cn(
        { "opacity-1": isDragging },
        "relative rounded bg-gray-200 my-2 p-2 shadow text-gray-600 hover:bg-gray-300 hover:text-gray-400 transition-all"
      )}
    >
      <Link
        ref={dragPreview}
        className={cn({ "bg-gray-600 opacity-1": isDragging })}
        to={`task/${task.id}`}
      >
        {task.title}
      </Link>
      <div className="flex space-2 mt-2 size-1 h-[13px] justify-start items-center">
        {task.description && <MenuAlt width={5} height={5} />}
        {/* <Chat width={5} height={5} /> */}
      </div>
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
            onClick={() => onTaskDelete(task.id, task.columnId)}
            className="rounded cursor-pointer bg-red-300 text-gray-700 hover:bg-red-400 py-1 px-5 mb-1"
          >
            Удалить
          </div>
          <div
            onClick={() => onTaskOpen(task.id)}
            className="bg-gray-100 rounded cursor-pointer text-gray-700 hover:bg-gray-200 py-1 px-5 mb-1"
          >
            Открыть
          </div>
        </div>
      </div>
    </div>
  );
};

export { TaskItem };
