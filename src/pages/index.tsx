import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import TaskDetail from "./TaskDetail";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="task/:taskId" element={<TaskDetail />} />
    </Routes>
  );
};
