import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import spTodoSlice from "./spTodoSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    spTodo: spTodoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
