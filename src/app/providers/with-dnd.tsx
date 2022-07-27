import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import React from "react";

export const WithDnd = (component: () => React.ReactNode) => () =>
  <DndProvider backend={HTML5Backend}>{component()}</DndProvider>;
