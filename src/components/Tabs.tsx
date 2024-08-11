import { useContext } from "react";
import { twMerge } from "tailwind-merge";
import { ActiveTabContext } from "../pages/AllFiles";

const Tabs = () => {
  const [activeTab, setActiveTab] = useContext(ActiveTabContext);
  return (
    <div className="flex items-center rounded-full shadow text-lg tracking-wide font-bold text-gray-600 cursor-pointer">
      <div
        className={twMerge(
          "px-4 py-2 rounded-full border border-white",
          activeTab == "IMAGE"
            ? "border-gray-400/25 shadow text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400"
            : "",
        )}
        onClick={() => setActiveTab("IMAGE")}
      >
        Image
      </div>
      <div
        className={twMerge(
          "px-4 py-2 rounded-full border border-white",
          activeTab == "VIDEO"
            ? "border-gray-400/25 shadow text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-green-400"
            : "",
        )}
        onClick={() => setActiveTab("VIDEO")}
      >
        Video
      </div>
    </div>
  );
};

export default Tabs;
