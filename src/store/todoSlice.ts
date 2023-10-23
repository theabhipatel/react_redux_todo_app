import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ITodo {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: number;
}

const initialState: ITodo[] = [];

const todoSlice = createSlice({
  name: "todoSlice",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const indexOfElement = state.findIndex(
        (item) => item.id === action.payload
      );
      if (indexOfElement !== -1) {
        state.splice(indexOfElement, 1);
      }
    },
    completeTodo: (
      state,
      action: PayloadAction<{ id: string; isDone: boolean }>
    ) => {
      const todoIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (todoIndex !== -1) {
        const todo = state.find((item) => item.id === action.payload.id);
        if (todo) {
          const newTodo = { ...todo, isDone: action.payload.isDone };
          state.splice(todoIndex, 1, newTodo);
        }
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todoIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (todoIndex !== -1) {
        const todo = state.find((item) => (item.id = action.payload.id));
        if (todo) {
          const newTodo = { ...todo, title: action.payload.title };
          state.splice(todoIndex, 1, newTodo);
        }
      }
    },
  },
});

export const { addTodo, removeTodo, completeTodo, editTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
