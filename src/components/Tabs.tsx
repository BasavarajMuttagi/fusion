import { Context, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { activeTabType } from "../pages/AllFiles";

const Tabs = ({
  context,
}: {
  context: Context<
    [activeTabType, React.Dispatch<React.SetStateAction<activeTabType>>]
  >;
}) => {
  const [activeTab, setActiveTab] = useContext(context);
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
