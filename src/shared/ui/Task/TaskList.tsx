/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from "react";
import moment from "moment";
import cn from "classnames";
import { v4 as uuid } from "uuid";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";

import {
  useAddTaskMutation,
  useGetTasksByColumnQuery,
  useRemoveTaskMutation,
} from "store/api";
import { ITask } from "entities/task";
import { TaskItem } from "./TaskItem";
import { Dots } from "shared/icons/Dots";
import { Refresh } from "shared/icons/Refresh";

interface TaskListProps {
  title?: string;
  columnId: string;
  boardId: string;
}

const TaskList: FC<TaskListProps> = ({ title, columnId, boardId }) => {
  const { data: tasks = [], isFetching } = useGetTasksByColumnQuery(columnId);
  const [removeTask] = useRemoveTaskMutation();
  const [addTask] = useAddTaskMutation();
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false)
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: () => ({
      columnId
    })
  }));

  const handleTaskClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.nativeEvent.stopImmediatePropagation();
  };

  const addTaskClick = () => {
    if (!isInputOpen) {
      setIsInputOpen(true)
      return
    }

    if (!newTask) return;

    const _task: ITask = {
      id: uuid(),
      userId: null,
      completed: false,
      title: newTask,
      description: "",
      columnId: columnId,
      boardId: boardId,
      created: moment(),
      updated: moment(),
      orderNumber: tasks.length+1,
    };

    setNewTask("");
    addTask(_task);
    setIsInputOpen(false)
  };

  const onTaskDelete = (taskId: string, columnId: string) => {
    removeTask({taskId, columnId});
  };

  const onTaskOpen = (taskId: string) => {
    navigate(`/board/${boardId}/task/${taskId}`);
  };

  return (
    <div
      ref={drop}
      className={cn(
        " min-w-[250px] h-fit w-[300px] bg-gray-100 overflow-y-auto flex flex-col p-2 rounded shadow mx-2"
      )}
    >
      <div className="font-bold text-lg mb-2 flex items-center justify-between">
        {title}
        <div className="flex items-center">
          <div className={"cursor-pointer mr-2"}>
            {isFetching && <Refresh />}
          </div>
          <div className={"cursor-pointer"}>
            <Dots />
          </div>
        </div>

      </div>
      <div className="overflow-y-auto">
        {tasks?.map((task: ITask) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDelete={onTaskDelete}
            onTaskOpen={onTaskOpen}
            onTaskClick={handleTaskClick}
          />
        ))}
      </div>
      <button
        onClick={() => addTaskClick()}
        className="mt-2 cursor-pointer bg-gray-500 text-white py-2 rounded shadow hover:text-gray-500 hover:bg-white hover:border-gray-500 hover:shadow-lg trasition-all"
      >
        + Добавить карточку
      </button>
      <input
        placeholder="Ввести заголовок для этой карточки"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className={cn("p-2 mt-2 outline-none block", { "hidden": !isInputOpen })}
      />
    </div>
  );
};

export { TaskList };