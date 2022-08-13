import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import TaskDetail from "../pages/TaskDetail";
import BoardPage from "pages/BoardPage";

import SignupPage from "pages/SignupPage";
import SigninPage from "pages/SigninPage";

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="auth/signup" element={<SignupPage />} />
        <Route path="auth/signin" element={<SigninPage />} />

        <Route path="board/:boardId/*" element={<BoardPage />}>
          <Route path="task/:taskId" element={<TaskDetail />} />
          <Route path="*" element={<div>No Match</div>} />
        </Route>
      </Routes>

      <Routes>
        <Route path="board/:boardId/task/:taskId" element={<TaskDetail />} />
      </Routes>
    </>
  );
};
