import { ArrowUp } from "@phosphor-icons/react";
import KPICard from "../components/KPICard";
import useFusionStore from "../store";
const kpiData = [
  {
    name: "Total Revenue",
    stat: 120500,
    change: 15.3,
    indicator: true,
  },
  {
    name: "New Customers",
    stat: 1250,
    change: 5.7,
    indicator: true,
  },
  {
    name: "Churn Rate",
    stat: 2.4,
    change: 0.8,
    indicator: false,
  },
  {
    name: "Average Order Value",
    stat: 95,
    change: 3.2,
    indicator: true,
  },
  {
    name: "Customer Satisfaction",
    stat: 92,
    change: 1.5,
    indicator: true,
  },
  {
    name: "Site Traffic",
    stat: 45000,
    change: 7.9,
    indicator: true,
  },
  {
    name: "Conversion Rate",
    stat: 3.2,
    change: 0.5,
    indicator: false,
  },
  {
    name: "Operating Costs",
    stat: 78000,
    change: 2.1,
    indicator: true,
  },
];
const Home = () => {
  const { displayName } = useFusionStore();
  return (
    <div className="h-full w-full space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold space-x-1">
          <span>Welcome Home,</span>
          <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#f5af19] to-[#f12711]">
            {displayName}
          </span>
        </h1>
        <button className="flex items-center space-x-2 py-2 px-4 rounded-md bg-violet-500 text-white">
          <span className="font-medium">Upload</span>
          <ArrowUp size={20} weight="bold" />
        </button>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 gap-5">
        {kpiData.map((eachCard) => (
          <KPICard {...eachCard} />
        ))}
      </div>

      <div>
        <h1 className="text-lg">Recents</h1>
      </div>
    </div>
  );
};

export default Home;
