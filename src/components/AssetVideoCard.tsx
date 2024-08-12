import { DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { CloudinaryAsset } from "../types";
import { deleteById } from "../axios/apiService";
import StarButton from "./StarButton";
import moment from "moment";
import ContentAwareVideo from "./ContentAwareVideo";

function AssetVideoCard({
  publicId,
  createdAt,
  height,
  width,
  format,
  assetId,
  displayName,
  starred,
}: CloudinaryAsset) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-[360px] max-h-[400px] border rounded-md shadow">
      <div className="relative w-full">
        <ContentAwareVideo
          cloudName={import.meta.env.VITE_CLOUDINARY_NAME}
          publicId={publicId}
        />
        <div className="absolute top-4 right-4 bg-white/80 px-2 py-1 rounded-md space-x-1 uppercase text-xs font-medium">
          <span>{`${height} X ${width}`}</span>
          <span>{format}</span>
        </div>
      </div>
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-medium">{displayName}</h4>
          <p className="text-[10px] text-gray-500 font-medium">
            {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
        <div className="flex items-center gap-4 relative">
          <StarButton assetId={assetId} starred={starred} />
          <button onClick={toggleDropdown}>
            <DotsThreeOutlineVertical
              size={32}
              weight="fill"
              className="w-5 h-5 text-gray-500"
            />
          </button>
          {dropdownOpen && (
            <div
              onClick={() => setDropdownOpen(false)}
              ref={dropdownRef}
              className="z-10 absolute top-4 -right-20 mt-2 bg-white shadow rounded-md w-24 text-gray-600 border border-gray-100"
            >
              <ul className="flex flex-col">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
                  Edit
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                  onClick={() => deleteById(assetId)}
                >
                  Delete
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md">
                  Share
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssetVideoCard;
