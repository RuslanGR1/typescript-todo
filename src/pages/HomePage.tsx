import React from "react";

import TaskFilter from "../shared/ui/TaskFilter";
import TaskSearch from "../shared/ui/TaskSearch";
import TaskList from "../shared/ui/TaskList";

const HomePage = () => {
  return (
    <div className="p-5 flex flex-col">
      {/* <TaskSearch />
      <TaskFilter /> */}
      <TaskList />
    </div>
  );
};

export default HomePage;
