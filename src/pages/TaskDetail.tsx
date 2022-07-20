import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetTaskQuery } from "store/api";

interface TaskDetailProps {}

const TaskDetail: FC<TaskDetailProps> = () => {
  const { taskId } = useParams();
  const { data: task } = useGetTaskQuery(taskId);
  return (
    <div className="container mt-5 mx-auto">
      <div className="bg-gray-200 p-5 rounded shadow w-[400px] h-[600px]">
        <div className="mb-4">Task#{taskId}</div>
        <textarea
          className="border p-2 min-h-[150px] min-w-[300px]"
          value={task?.title}
        />
      </div>
      <div className="p-4 mt-5 bg-gray-300 text-white w-[300px] h-[200px] hover:bg-gray-200 point hover:text-gray-500 hover:ml-5 transition-all ">
        board 1
      </div>
    </div>
  );
};

export default TaskDetail;
