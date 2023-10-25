import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className=" w-full flex justify-between px-10 py-5 bg-slate-700">
      <div>
        <NavLink to={"/"}>Todo App</NavLink>
      </div>
      <div>
        <div className="flex gap-5">
          <NavLink
            to={"/todo"}
            className={"bg-blue-500 rounded-md px-2 hover:bg-blue-600"}
          >
            Todo
          </NavLink>
          <NavLink
            to={"/sp-todo"}
            className={"bg-blue-500 rounded-md px-2 hover:bg-blue-600"}
          >
            Sp Todo
          </NavLink>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="border-2 border-blue-500 rounded-md px-2">cart</div>
        <div className="border-2 border-blue-500 rounded-md px-2 md:hidden">
          Ham
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
