/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from "react";
import {
  useAddTaskMutation,
  useGetTasksByColumnQuery,
  useLazyGetTasksByColumnQuery,
} from "store/api";
import { ITask } from "entities/task";
import cn from "classnames";
import TaskItem from "./TaskItem";
import { v4 as uuid } from "uuid";

interface TaskListProps {
  title?: string;
  columnId: string;
}

const TaskList: FC<TaskListProps> = ({ title, columnId }) => {
  const { data: tasks } = useGetTasksByColumnQuery(columnId);
  const [addTask, result] = useAddTaskMutation();
  const [newTask, setNewTask] = useState("");
  const [getTasksLazy, temp1, temp2] = useLazyGetTasksByColumnQuery();
  console.log("tempdf", temp1, temp2);

  const addTaskClick = () => {
    if (!newTask) return;

    const _task: ITask = {
      id: uuid(),
      userId: null,
      completed: false,
      title: newTask,
      description: "",
      columnId: columnId,
      boardId: 1,
      created: 34335323,
      updated: 343432432,
    };
    console.log(result);
    setNewTask("");
    //console.log([addTask, result]);
    addTask(_task);
    //getTasksLazy(columnId);
  };

  return (
    <div
      className={cn(
        "h-fit w-[300px] bg-gray-100 overflow-y-auto flex flex-col p-2 rounded shadow mx-2"
      )}
    >
      <div className="font-bold text-lg mb-2">{title}</div>
      <div className="overflow-y-auto">
        {tasks?.map((task: ITask) => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
      <button
        onClick={() => addTaskClick()}
        className="mt-2 bg-gray-500 text-white py-2 rounded shadow hover:text-gray-500 hover:bg-white hover:border-gray-500 hover:shadow-lg trasition-all"
      >
        + Добавить карточку
      </button>
      <input
        placeholder="Ввести заголовок для этой карточки"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="p-2 mt-2 outline-none"
      />
    </div>
  );
};

export default TaskList;
