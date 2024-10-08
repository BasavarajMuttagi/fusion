import { ArrowUp } from "@phosphor-icons/react";
import KPICard from "../components/KPICard";
import useFusionStore from "../store";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import UploadVideo from "../components/UploadVideo";
import { CloudinaryAsset } from "../types";
import AssetImageCard from "../components/AssetImageCard";
import { getAssets } from "../axios/apiService";
import AssetVideoCard from "../components/AssetVideoCard";

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
  const [show, setShow] = useState(false);
  const [recentImages, setRecentImages] = useState<CloudinaryAsset[]>();
  const [recentVideos, setRecentVideos] = useState<CloudinaryAsset[]>();
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);

  useEffect(() => {
    getAssets("image").then((res) => {
      const data = res?.data as CloudinaryAsset[];
      setRecentImages(data);
    });

    getAssets("video").then((res) => {
      const data = res?.data as CloudinaryAsset[];
      setRecentVideos(data);
    });
  }, [isUploadSuccess]);
  return (
    <>
      <div className="h-full w-full space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold space-x-1">
            <span>Welcome Home,</span>
            <span className="capitalize text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#f5af19] to-[#f12711]">
              {displayName?.toLowerCase()}
            </span>
          </h1>
          <button
            onClick={() => setShow(true)}
            className="flex items-center space-x-2 py-2 px-4 rounded-md bg-violet-500 text-white"
          >
            <span className="font-medium">Upload</span>
            <ArrowUp size={20} weight="bold" />
          </button>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-5">
          {kpiData.map((eachCard) => (
            <KPICard {...eachCard} key={eachCard.name} />
          ))}
        </div>

        <div className="space-y-5 pb-10">
          <h1 className="text-lg font-bold">Recents</h1>
          <div className="space-y-3">
            <h2 className="text-lg font-bold">
              <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">
                Images
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {recentImages?.map((eachImage) => {
                return (
                  <AssetImageCard {...eachImage} key={eachImage.assetId} />
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold">
              <span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-green-400">
                Videos
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {recentVideos?.map((eachVideo) => {
                return (
                  <AssetVideoCard {...eachVideo} key={eachVideo.assetId} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {show &&
        createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3">
            <UploadVideo
              closeDialog={setShow}
              setIsUploadSuccess={setIsUploadSuccess}
            />
          </div>,
          document.body,
        )}
    </>
  );
};

export default Home;
