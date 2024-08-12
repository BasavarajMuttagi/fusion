import { Star } from "@phosphor-icons/react";
import apiClient from "../axios/apiClient";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
const StarButton = ({
  starred,
  assetId,
}: {
  starred: boolean;
  assetId: string;
}) => {
  const starById = async (assetId: string) => {
    try {
      const res = await apiClient.get(`/cloudinary/star/${assetId}`);
      return res;
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };
  return (
    <div onClick={() => starById(assetId)}>
      {starred ? (
        <Star size={24} weight="fill" className="text-yellow-500" />
      ) : (
        <Star size={24} className="text-gray-500" />
      )}
    </div>
  );
};

export default StarButton;
