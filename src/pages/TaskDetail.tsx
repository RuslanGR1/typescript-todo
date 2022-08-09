import { ITask } from "entities";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "shared/ui/Button";
import Modal from "shared/ui/Modal";
import { useGetTaskQuery, useUpdateTaskMutation } from "store/api";

interface TaskDetailProps {}

const TaskDetail: FC<TaskDetailProps> = () => {
  const { taskId, boardId } = useParams();
  const [visible, setVisible] = useState<boolean>(true);
  const { data: task } = useGetTaskQuery(taskId);
  const navigate = useNavigate();
  const [updateTask] = useUpdateTaskMutation();
  const [descriptionActive, setDescriptionActive] = useState(false);
  const [currentTask, setCurrentTask] = useState<ITask | any>(task);

  useEffect(() => {
    if (!visible) {
      navigate(`/board/${boardId}`);
    }
  }, [boardId, navigate, visible]);

  useEffect(() => {
    setCurrentTask(task);
  }, [task]);

  const onSave = () => {
    const updatedTask = { ...currentTask };
    console.log(currentTask);
    if (updatedTask) {
      setCurrentTask(updatedTask);
      updateTask({ task: currentTask });
    }
  };

  const onFiledChange = (
    e:
      | React.ChangeEvent<HTMLElement>
      | React.ChangeEventHandler<HTMLInputElement>
      | React.ChangeEventHandler<HTMLTextAreaElement>
      | any
  ) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  return (
    <Modal setVisible={setVisible} visible={visible}>
      <div tabIndex={2} className="flex flex-col" onFocus={() => {}}>
        <input
          className="border-none p-2 min-w-[300px] outline-none bg-gray-100 mb-2"
          value={currentTask?.title}
          name="title"
          onChange={onFiledChange}
        />
        <p className="my-2">Описание:</p>
        {descriptionActive ? (
          <textarea
            className="border-none p-2 min-h-[150px] min-w-[300px] outline-none bg-gray-100"
            value={currentTask?.description}
            name="description"
            onChange={onFiledChange}
          />
        ) : (
          <div tabIndex={1} onFocus={() => setDescriptionActive(true)}>
            <ReactMarkdown
              className="border-none p-2 min-h-[150px] min-w-[300px] outline-none bg-gray-100"
              children={currentTask?.description}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        )}

        <p className="my-2">Действия:</p>
        <div className="min-h-[50px]"></div>
        <Button onClick={() => onSave()} title="Сохранить" />
      </div>
    </Modal>
  );
};

export default TaskDetail;
