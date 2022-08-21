import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import TaskDetail from "./TaskDetail";
import SignupPage from "./SignupPage";
import SigninPage from "./SigninPage";
import BoardPage from "./BoardPage";
import RequireAuth from "features/auth/RequireAuth";
import Layout from "app/layout";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="auth/signup" element={<SignupPage />} />
        <Route path="auth/signin" element={<SigninPage />} />

        <Route element={<RequireAuth />}>
          <Route index element={<HomePage />} />
          <Route path="board/:boardId/*" element={<BoardPage />}>
            <Route path="task/:taskId" element={<TaskDetail />} />
          </Route>
        </Route>
        <Route path="*" element={<div>No Match</div>} />
      </Route>
    </Routes>
  );
};
