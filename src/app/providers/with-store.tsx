import React from "react";
import { Provider } from "react-redux";
import { setupStore } from "store";

export const withStore = (component: () => React.ReactNode) => () => {
  const store = setupStore();
  return <Provider store={store}>{component()}</Provider>;
};
