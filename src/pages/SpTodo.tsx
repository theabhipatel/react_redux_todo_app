import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  ISpSingleTodo,
  addSpTodo,
  addSpTodoType,
  removeSpTodo,
} from "../store/spTodoSlice";

const SpTodo = () => {
  const [title, setTitle] = useState("");
  const [todoType, setTodoType] = useState("");
  const todoState = useAppSelector((state) => state.spTodo);
  const [curTodoType, setCurTodoType] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurTodoType(todoState[0]?.todoType);
  }, []);

  const handleAddTodoType = () => {
    dispatch(addSpTodoType(todoType));
    setTodoType("");
  };
  const handleAddTodo = () => {
    dispatch(
      addSpTodo({
        todoType: curTodoType,
        todo: { id: Date.now(), title, isDone: false },
      })
    );
    setTitle("");
  };

  const handleRemoveTodo = (todoId: number) => {
    dispatch(removeSpTodo({ todoType: curTodoType, todoId }));
  };

  /** ----> getting currrent todos  */
  const curTodos = todoState.find(
    (item) =>
      item.todoType?.toLocaleLowerCase() === curTodoType.toLocaleLowerCase()
  );

  console.log("curTodos --->", curTodos);

  return (
    <div className="w-full h-screen flex ">
      <div className="w-[30%] h-full border-r border-slate-500 pt-5">
        <div className="flex flex-col gap-3 px-5 ">
          {todoState.map((item) => {
            return (
              <div
                key={item.todoType}
                onClick={() => setCurTodoType(item.todoType)}
                className={`p-2 rounded-md ${
                  curTodoType === item.todoType
                    ? "bg-blue-600 "
                    : "bg-slate-600 hover:bg-slate-700"
                } `}
              >
                <span>{item.todoType}</span>
              </div>
            );
          })}
        </div>
        <div className="p-5 flex  mt-2 ">
          <input
            type="text"
            value={todoType}
            placeholder="Add todo type here"
            onChange={(e) => setTodoType(e.target.value)}
            className="w-[80%] p-2 rounded-md border border-white bg-transparent"
          />
          <button
            className="p-2 rounded-md ml-10 bg-slate-700"
            onClick={handleAddTodoType}
          >
            Add
          </button>
        </div>
      </div>
      <div className="w-[70%] h-full  p-10">
        <div>
          <span className="font-bold">Todo Type :</span>
          <span>{curTodoType}</span>
        </div>
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
            onClick={handleAddTodo}
          >
            Add
          </button>
        </div>
        <div>
          {curTodos ? (
            curTodos.todos.map((item, idx) => {
              return (
                <SingalTodoItem
                  key={idx}
                  item={item}
                  handleRemoveTodo={handleRemoveTodo}
                />
              );
            })
          ) : (
            <div>
              {" "}
              <h2>There is not todos Found</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpTodo;

interface ISingalTodoItemProps {
  item: ISpSingleTodo;
  handleRemoveTodo: (id: number) => void;
  // editItem: string;
  // setEditItem: Dispatch<SetStateAction<string>>;
  // setTitle: Dispatch<SetStateAction<string>>;
}

const SingalTodoItem: FC<ISingalTodoItemProps> = ({
  item,
  handleRemoveTodo,
}) => {
  return (
    <div
      className="bg-slate-600 m-2 p-3 rounded-md flex gap-5"
      // className={`${
      //   editItem !== item.id ? "bg-slate-600" : "bg-slate-700"
      // } m-2 p-3 rounded-md flex gap-5`}
    >
      <div className="w-[60%] flex gap-5 items-center">
        <input
          type="checkbox"
          // checked={isChecked}
          name="isDone"
          // onChange={handleCheck}
        />
        <h3>{item.title}</h3>
      </div>
      <div className="w-[40%] flex justify-around">
        {/* <button
          className="bg-slate-900 p-2 px-4 rounded-md"
          onClick={handleEdit}
        >
          edit
        </button> */}
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
