import { TrendDown, TrendUp } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

const KPICard = ({
  name,
  stat,
  change,
  indicator,
}: {
  name: string;
  stat: number;
  change: number;
  indicator: boolean;
}) => {
  return (
    <div className="flex items-center justify-start h-fit w-full rounded-md border space-y-2 px-4 py-2">
      <div>
        <dt className="font-medium text-sm">{name}</dt>
        <div className="flex items-baseline space-x-2">
          <div className="font-extrabold text-lg">{stat}</div>
          <div
            className={twMerge(
              "flex items-center space-x-2",
              indicator ? "text-green-400" : "text-red-400",
            )}
          >
            <span className="text-xs font-medium">{change}%</span>
            <div>
              {indicator ? (
                <TrendUp size={20} className="text-green-400" />
              ) : (
                <TrendDown size={20} className="text-red-400" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
