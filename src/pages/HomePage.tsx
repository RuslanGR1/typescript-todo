import React from "react";

import TaskFilter from "../shared/ui/TaskFilter";
import TaskSearch from "../shared/ui/TaskSearch";
import TaskList from "../shared/ui/TaskList";

const HomePage = () => {
  return (
    <div className="container mt-5 mx-auto flex flex-col">
      {/* <TaskSearch />
      <TaskFilter /> */}
      <div className="flex">
        <TaskList />
      </div>
    </div>
  );
};

export default HomePage;
