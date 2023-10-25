import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISpSingleTodo {
  id: number;
  title: string;
  isDone: boolean;
}

export interface ISpTodo {
  todoType: string;
  todos: ISpSingleTodo[];
}
const initialState: ISpTodo[] = [
  {
    todoType: "Home",
    todos: [],
  },
];

const spTodoSlice = createSlice({
  name: "spTodoSlice",
  initialState,
  reducers: {
    addSpTodoType: (state, action: PayloadAction<string>) => {
      const isTodo = state.find(
        (item) =>
          item.todoType.toLocaleLowerCase() ===
          action.payload.toLocaleLowerCase()
      );
      if (isTodo) {
        console.log("Todo type is already there ❌");
        return;
      }
      state.push({ todoType: action.payload, todos: [] });
    },
    addSpTodo: (
      state,
      action: PayloadAction<{ todoType: string; todo: ISpSingleTodo }>
    ) => {
      const findTodo = state.find(
        (item) =>
          item.todoType.toLocaleLowerCase() ===
          action.payload.todoType.toLocaleLowerCase()
      );
      if (!findTodo) {
        console.log("Todo type is not there ❌");
        return;
      }
      findTodo.todos.push(action.payload.todo);
    },
    removeSpTodo: (
      state,
      action: PayloadAction<{ todoType: string; todoId: number }>
    ) => {
      const findTodo = state.find(
        (item) =>
          item.todoType.toLocaleLowerCase() ===
          action.payload.todoType.toLocaleLowerCase()
      );
      if (!findTodo) {
        console.log("Todo type is not there ❌");
        return;
      }
      const findIndexOfTodo = findTodo.todos.findIndex(
        (item) => item.id === action.payload.todoId
      );
      if (findIndexOfTodo === -1) {
        console.log("Todo is not found ❌");
        return;
      }
      findTodo.todos.splice(findIndexOfTodo, 1);
    },
  },
});

export const { addSpTodoType, addSpTodo, removeSpTodo } = spTodoSlice.actions;

export default spTodoSlice.reducer;
