import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TaskDetail from "../pages/TaskDetail";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="task/:taskId" element={<TaskDetail />} />
    </Routes>
  );
};
