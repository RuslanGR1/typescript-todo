import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
