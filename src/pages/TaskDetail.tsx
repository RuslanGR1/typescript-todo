import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetTaskQuery } from "store/api";

interface TaskDetailProps { }

const TaskDetail: FC<TaskDetailProps> = () => {
  const { taskId, boardId } = useParams();
  const [visible, setVisible] = useState<boolean>(true);
  const { data: task } = useGetTaskQuery(taskId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!visible) {
      navigate(`/board/${boardId}`);
    }
  }, [boardId, navigate, visible]);

  const onModalClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="absolute top-0 right-0 flex justify-center items-center mx-auto w-screen h-screen bg-slate-100 overflow-hidden"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => setVisible(false)}
    >
      <div
        onClick={onModalClick}
        className="bg-gray-200 p-5 rounded shadow w-[400px] h-[600px]"
      >
        <div className="mb-4">Task#{taskId}</div>
        <textarea
          className="border p-2 min-h-[150px] min-w-[300px] outline-none bg-gray-100"
          value={task?.title}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
