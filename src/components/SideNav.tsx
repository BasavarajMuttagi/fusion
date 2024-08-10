import {
  Files,
  Gear,
  House,
  Info,
  ListStar,
  SignOut,
} from "@phosphor-icons/react";
import ProfileCard from "./ProfileCard";
import { NavLink } from "react-router-dom";

const SideNav = () => {
  return (
    <div className="w-64 flex flex-col justify-between h-full p-2 space-y-10 font-medium">
      <ProfileCard />
      <ul className="flex flex-col justify-start space-y-5 flex-1 py-5 ">
        <li className="group">
          <NavLink to={"/"}>
            <div className="flex items-center space-x-5 p-2 rounded-md cursor-pointer hover:bg-violet-400 hover:text-white group-has-[>.active]:bg-violet-400 group-[>.active]:text-white">
              <House size={24} />
              <p>Home</p>
            </div>
          </NavLink>
        </li>
        <li className="group">
          <NavLink to={"/allfiles"}>
            <div className="flex items-center space-x-5 p-2 rounded-md cursor-pointer hover:bg-violet-400 hover:text-white group-has-[>.active]:bg-violet-400 group-[>.active]:text-white">
              <Files size={24} />
              <p>All Files</p>
            </div>
          </NavLink>
        </li>
        <li className="group">
          <NavLink to={"/starred"}>
            <div className="flex items-center space-x-5 p-2 rounded-md cursor-pointer hover:bg-violet-400 hover:text-white group-has-[>.active]:bg-violet-400 group-[>.active]:text-white">
              <ListStar size={24} />
              <p>Starred</p>
            </div>
          </NavLink>
        </li>
        <li className="group">
          <NavLink to={"/settings"}>
            <div className="flex items-center space-x-5 p-2 rounded-md cursor-pointer hover:bg-violet-400 hover:text-white group-has-[>.active]:bg-violet-400 group-[>.active]:text-white">
              <Gear size={24} />
              <p>Settings</p>
            </div>
          </NavLink>
        </li>
        <li className="group">
          <NavLink to={"/help"}>
            <div className="flex items-center space-x-5 p-2 rounded-md cursor-pointer hover:bg-violet-400 hover:text-white group-has-[>.active]:bg-violet-400 group-[>.active]:text-white">
              <Info size={24} />
              <p>Help Center</p>
            </div>
          </NavLink>
        </li>
      </ul>

      <button className="flex items-center justify-center space-x-2 text-red-400 px-3 py-2 rounded-md border border-red-200 bg-red-50 hover:bg-red-300 hover:text-white">
        <span>Logout</span> <SignOut size={24} />
      </button>
    </div>
  );
};

export default SideNav;
