import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SpTodo from "./pages/SpTodo";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/sp-todo" element={<SpTodo />} />
        <Route
          path="*"
          element={
            <div className="w-full h-[80vh] flex justify-center items-center ">
              <h2 className="text-2xl ">Page not found</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
