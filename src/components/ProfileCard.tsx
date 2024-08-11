import { UserCircle } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const ProfileCard = () => {
  return (
    <div className="group">
      <NavLink to={"/profile"}>
        <div className="flex items-center border w-full rounded-md py-2 px-4 shadow-sm space-x-2 group-has-[>.active]:bg-gray-100 group-has-[>.active]:bg-gradient-to-r group-has-[>.active]:from-black group-has-[>.active]:to-purple-500">
          <UserCircle
            size={32}
            className="group-has-[>.active]:text-green-400"
          />
          <div>
            <h2 className="text-sm font-semibold text-black group-has-[>.active]:text-white">
              Basavaraj Muttagi
            </h2>
            <p className="text-xs font-medium text-gray-600 tracking-wide group-has-[>.active]:text-white">
              basavaraj@gmail.com
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default ProfileCard;
