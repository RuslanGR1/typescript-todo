import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "store/api";

interface TaskDetailProps {}

const TaskDetail: FC<TaskDetailProps> = () => {
  const { taskId } = useParams();
  const { data: task } = useGetTaskQuery(taskId);
  console.log("Task opened", taskId);

  return (
    <div className="container mt-5 mx-auto">
      <div className="bg-gray-200 p-5 rounded shadow w-[400px] h-[600px]">
        <div className="mb-4">Task#{taskId}</div>
        <textarea
          className="border p-2 min-h-[150px] min-w-[300px]"
          value={task?.title}
        />
      </div>
    </div>
  );
};

export default TaskDetail;
