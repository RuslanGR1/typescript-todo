import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TaskDetail from "../pages/TaskDetail";

export const IframeRoute = () => {
  return (
    <Routes>
      <Route path="/iframe" element={<HomePage />} />
      <Route path="/iframe/task/:taskId" element={<TaskDetail />} />
    </Routes>
  );
};
