import { isAxiosError } from "axios";
import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import toast from "react-hot-toast";
import apiClient from "../axios/apiClient";
import Tabs from "../components/Tabs";
import ContentAwareVideo from "../components/ContentAwareVideo";
import moment from "moment";
import { CloudinaryAsset } from "../types";
import StarButton from "../components/StarButton";
import { getStarredAssets } from "../axios/apiService";

export const ActiveTabContextStarred = createContext<
  [activeTabType, Dispatch<SetStateAction<activeTabType>>]
>(["IMAGE", () => {}]);
export type activeTabType = "IMAGE" | "VIDEO";

const Starred = () => {
  const [activeTab, setActiveTab] = useState<activeTabType>("IMAGE");
  const [recentImages, setRecentImages] = useState<CloudinaryAsset[]>();
  const [recentVideos, setRecentVideos] = useState<CloudinaryAsset[]>();

  const deleteById = async (assetId: string) => {
    try {
      const res = await apiClient.get(`/cloudinary/delete/${assetId}`);
      return res;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getStarredAssets("image").then((res) => {
      const data = res?.data as CloudinaryAsset[];
      setRecentImages(data);
    });
  }, []);

  useEffect(() => {
    getStarredAssets("video").then((res) => {
      const data = res?.data as CloudinaryAsset[];
      setRecentVideos(data);
    });
  }, []);

  return (
    <ActiveTabContextStarred.Provider value={[activeTab, setActiveTab]}>
      <div className="h-full w-full space-y-14">
        <div className="flex justify-center">
          <Tabs context={ActiveTabContextStarred} />
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
                {recentImages?.map(
                  ({
                    secureUrl,
                    createdAt,
                    height,
                    width,
                    format,
                    resourceType,
                    assetId,
                    displayName,
                    starred,
                  }) => {
                    return (
                      <div
                        className="border p-2 rounded-md space-y-1 shadow"
                        key={secureUrl}
                      >
                        <img src={secureUrl} className="w-full aspect-square" />
                        <div className="space-y-2">
                          <div className="text-sm font-semibold lg:text-base">
                            {displayName}
                          </div>
                          <div className="space-y-2 text-gray-600 text-[8px] font-medium md:text-[9px] xl:text-[10px]">
                            <div>Format : {`${resourceType}/${format}`}</div>
                            <div>Dimensions: {`${height} X ${width}`}</div>
                            <div>
                              Created At :{" "}
                              {moment(createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a",
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => deleteById(assetId)}
                            >
                              Delete
                            </button>
                            <StarButton assetId={assetId} starred={starred} />
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
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
                {recentVideos?.map(
                  ({
                    publicId,
                    secureUrl,
                    createdAt,
                    height,
                    width,
                    format,
                    resourceType,
                    displayName,
                    assetId,
                    starred,
                  }) => {
                    return (
                      <div
                        className="border p-2 rounded-md space-y-1 shadow"
                        key={secureUrl}
                      >
                        <ContentAwareVideo
                          cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
                          publicId={publicId}
                        />
                        <div className="space-y-2">
                          <div className="text-sm font-semibold lg:text-base">
                            {displayName}
                          </div>
                          <div className="space-y-2 text-gray-600 text-[8px] font-medium md:text-[9px] xl:text-[10px]">
                            <div>Format : {`${resourceType}/${format}`}</div>
                            <div>Dimensions: {`${height} X ${width}`}</div>
                            <div>
                              Created At :{" "}
                              {moment(createdAt).format(
                                "MMMM Do YYYY, h:mm:ss a",
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => deleteById(assetId)}
                            >
                              Delete
                            </button>
                            <StarButton assetId={assetId} starred={starred} />
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ActiveTabContextStarred.Provider>
  );
};

export default Starred;
