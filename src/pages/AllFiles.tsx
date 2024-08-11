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
import { CloudinaryResource, CloudinaryResponse } from "../types";
import ContentAwareVideo from "../components/ContentAwareVideo";
import moment from "moment";
export const ActiveTabContext = createContext<
  [activeTabType, Dispatch<SetStateAction<activeTabType>>]
>(["IMAGE", () => {}]);
type activeTabType = "IMAGE" | "VIDEO";

const AllFiles = () => {
  const [activeTab, setActiveTab] = useState<activeTabType>("IMAGE");
  const [recentImages, setRecentImages] = useState<CloudinaryResource[]>();
  const [recentVideos, setRecentVideos] = useState<CloudinaryResource[]>();

  const getRecentObjects = async (resource_type: string) => {
    try {
      const res = await apiClient.get(
        `/cloudinary/get-uploads/${resource_type}`,
      );
      return res;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getRecentObjects("image").then((res) => {
      const data = res?.data as CloudinaryResponse;
      setRecentImages(data.resources);
    });
  }, []);

  useEffect(() => {
    getRecentObjects("video").then((res) => {
      const data = res?.data as CloudinaryResponse;
      setRecentVideos(data.resources);
    });
  }, []);

  return (
    <ActiveTabContext.Provider value={[activeTab, setActiveTab]}>
      <div className="h-full w-full space-y-14">
        <div className="flex justify-center">
          <Tabs />
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
                    secure_url,
                    display_name,
                    format,
                    resource_type,
                    created_at,
                    height,
                    width,
                  }) => {
                    return (
                      <div
                        className="border p-2 rounded-md space-y-1 shadow"
                        key={secure_url}
                      >
                        <img
                          src={secure_url}
                          className="w-full aspect-square"
                        />
                        <div className="space-y-2">
                          <div className="text-sm font-semibold lg:text-base">
                            {display_name}
                          </div>
                          <div className="space-y-2 text-gray-600 text-[8px] font-medium md:text-[9px] xl:text-[10px]">
                            <div>Format : {`${resource_type}/${format}`}</div>
                            <div>Dimensions: {`${height} X ${width}`}</div>
                            <div>
                              Created At :{" "}
                              {moment(created_at).format(
                                "MMMM Do YYYY, h:mm:ss a",
                              )}
                            </div>
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
                    secure_url,
                    display_name,
                    format,
                    resource_type,
                    created_at,
                    height,
                    width,
                    public_id,
                  }) => {
                    return (
                      <div
                        className="border p-2 rounded-md space-y-1 shadow"
                        key={secure_url}
                      >
                        <ContentAwareVideo
                          cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
                          publicId={public_id}
                        />
                        <div className="space-y-2">
                          <div className="text-sm font-semibold lg:text-base">
                            {display_name}
                          </div>
                          <div className="space-y-2 text-gray-600 text-[8px] font-medium md:text-[9px] xl:text-[10px]">
                            <div>Format : {`${resource_type}/${format}`}</div>
                            <div>Dimensions: {`${height} X ${width}`}</div>
                            <div>
                              Created At :{" "}
                              {moment(created_at).format(
                                "MMMM Do YYYY, h:mm:ss a",
                              )}
                            </div>
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
    </ActiveTabContext.Provider>
  );
};

export default AllFiles;
