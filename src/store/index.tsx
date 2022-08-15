import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/auth/authSlice";
import { apiSlice } from "./slices/apiSlice";
import { columnApi, boardApi, taskApi } from "./api";

const rootReducer = combineReducers({
  [columnApi.reducerPath]: columnApi.reducer,
  [taskApi.reducerPath]: taskApi.reducer,
  [boardApi.reducerPath]: taskApi.reducer,

  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        boardApi.middleware,
        taskApi.middleware,
        columnApi.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
