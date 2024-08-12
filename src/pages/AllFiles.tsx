import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import Tabs from "../components/Tabs";
import { CloudinaryAsset } from "../types";
import AssetImageCard from "../components/AssetImageCard";
import { getAssets } from "../axios/apiService";

export const ActiveTabContextAllFiles = createContext<
  [activeTabType, Dispatch<SetStateAction<activeTabType>>]
>(["IMAGE", () => {}]);
export type activeTabType = "IMAGE" | "VIDEO";

const AllFiles = () => {
  const [activeTab, setActiveTab] = useState<activeTabType>("IMAGE");
  const [recentImages, setRecentImages] = useState<CloudinaryAsset[]>();
  const [recentVideos, setRecentVideos] = useState<CloudinaryAsset[]>();

  useEffect(() => {
    getAssets("image").then((res) => {
      const data = res?.data as CloudinaryAsset[];
      setRecentImages(data);
    });
  }, []);

  useEffect(() => {
    getAssets("video").then((res) => {
      const data = res?.data as CloudinaryAsset[];
      setRecentVideos(data);
    });
  }, []);

  return (
    <ActiveTabContextAllFiles.Provider value={[activeTab, setActiveTab]}>
      <div className="h-full w-full space-y-14">
        <div className="flex justify-center">
          <Tabs context={ActiveTabContextAllFiles} />
        </div>
        <div className="space-y-5 pb-10">
          {activeTab === "IMAGE" && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold">
                <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">
                  Images
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {recentImages?.map((eachImage) => {
                  return <AssetImageCard {...eachImage} />;
                })}
              </div>
            </div>
          )}

          {activeTab === "VIDEO" && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold">
                <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-green-400">
                  Videos
                </span>
              </h2>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {recentVideos?.map((eachVideo) => {
                  return <AssetImageCard {...eachVideo} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </ActiveTabContextAllFiles.Provider>
  );
};

export default AllFiles;
