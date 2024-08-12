import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import apiClient from "./apiClient";
import apiEndpoints from "./apiEndpoints";

const deleteById = async (assetId: string) => {
  try {
    const res = await apiClient.delete(apiEndpoints.DELETE_ASSET(assetId));
    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.message);
    }
  }
};

const getAssets = async (resource_type: string) => {
  try {
    const res = await apiClient.get(apiEndpoints.GET_ASSETS(resource_type));
    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.message);
    }
  }
};

const getStarredAssets = async (resource_type: string) => {
  try {
    const res = await apiClient.get(
      apiEndpoints.GET_STARRED_ASSETS(resource_type),
    );
    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error.message);
    }
  }
};

export { deleteById, getAssets, getStarredAssets };
