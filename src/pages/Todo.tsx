import { Dispatch, FC, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  ITodo,
  addTodo,
  completeTodo,
  editTodo,
  removeTodo,
} from "../store/todoSlice";

const Todo = () => {
  const todos = useAppSelector((state) => state.todo);
  const [editItem, setEditItem] = useState("");

  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        title,
        createdAt: Date.now(),
        id: Date.now().toString(),
        isDone: false,
      })
    );
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = () => {
    dispatch(editTodo({ id: editItem, title }));
    setEditItem("");
  };

  const handleTodo = () => {
    if (!title) return;
    if (editItem) {
      handleEditTodo();
    } else {
      handleAddTodo();
    }
    setTitle("");
  };

  return (
    <div className="w-full h-screen flex ">
      <div className="w-[20%] h-full"></div>
      <div className="w-[80%] h-full  p-10">
        <div className="p-5">
          <input
            type="text"
            value={title}
            placeholder="Write somthing here"
            onChange={(e) => setTitle(e.target.value)}
            className="w-[50%] p-2 rounded-md border border-white bg-transparent"
          />
          <button
            className="p-2 rounded-md ml-10 bg-slate-700"
            onClick={handleTodo}
          >
            {editItem ? "Edit" : "Add"}
          </button>
        </div>
        <div>
          {todos.map((item) => {
            return (
              <SingalTodoItem
                key={item.id}
                item={item}
                handleRemoveTodo={handleRemoveTodo}
                editItem={editItem}
                setEditItem={setEditItem}
                setTitle={setTitle}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Todo;

interface ISingalTodoItemProps {
  item: ITodo;
  handleRemoveTodo: (id: string) => void;
  editItem: string;
  setEditItem: Dispatch<SetStateAction<string>>;
  setTitle: Dispatch<SetStateAction<string>>;
}

const SingalTodoItem: FC<ISingalTodoItemProps> = ({
  handleRemoveTodo,
  item,
  editItem,
  setEditItem,
  setTitle,
}) => {
  const [isChecked, setIsChecked] = useState(item.isDone);
  const dispatch = useAppDispatch();

  const handleCheck = () => {
    setIsChecked((prev) => !prev);
    dispatch(completeTodo({ id: item.id, isDone: !isChecked }));
  };

  const handleEdit = () => {
    setTitle(item.title);
    setEditItem(item.id);
  };

  return (
    <div
      className={`${
        editItem !== item.id ? "bg-slate-600" : "bg-slate-700"
      } m-2 p-3 rounded-md flex gap-5`}
    >
      <div className="w-[60%] flex gap-5 items-center">
        <input
          type="checkbox"
          checked={isChecked}
          name="isDone"
          onChange={handleCheck}
        />
        <h3 className={`${isChecked && "line-through"}`}>{item.title}</h3>
      </div>
      <div className="w-[40%] flex justify-around">
        <button
          className="bg-slate-900 p-2 px-4 rounded-md"
          onClick={handleEdit}
        >
          edit
        </button>
        <button
          className="bg-slate-900 p-2 rounded-md"
          onClick={() => handleRemoveTodo(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
