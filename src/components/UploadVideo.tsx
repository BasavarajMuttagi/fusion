import { CircleNotch, UploadSimple, X } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import apiClient from "../axios/apiClient";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const UploadVideo = ({
  closeDialog,
}: {
  closeDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const Clear = () => {
    setSelectedFile(null);
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      const result = await apiClient.get("/cloudinary/signature");
      const { signature, timestamp } = result.data as {
        signature: string;
        timestamp: number;
      };
      await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/auto/upload`,
        {
          file: selectedFile,
          api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
          signature,
          timestamp,
        },
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(progressEvent.progress! * 100);
            setUploadProgress(percentCompleted);
            console.log(`Upload Progress: ${percentCompleted}%`);
          },
        },
      );
      closeDialog(false);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="max-w-lg w-full bg-neutral-800 h-96 rounded-md flex flex-col justify-between p-4 border-2 border-neutral-700/30">
      <div className="flex justify-end">
        <div
          className="p-1 rounded-full bg-zinc-100 cursor-pointer"
          onClick={() => closeDialog((prev) => !prev)}
        >
          <X size={16} className="text-black" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-5">
        {!selectedFile && (
          <>
            <label htmlFor="fileUpload" className="space-y-5 cursor-pointer">
              <UploadSimple
                size={50}
                weight="duotone"
                className="mx-auto fill-green-400"
              />
              <div className="px-5 py-2 font-medium rounded-full bg-zinc-100 text-zinc-900 hover:bg-zinc-300">
                select files
              </div>
              <input
                ref={fileInputRef}
                type="file"
                id="fileUpload"
                className="hidden"
                accept=".mp4,.mov,.mkv"
                multiple={false}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
            </label>
            <p className="text-xs text-neutral-500">
              supported video formats .mp4 .mov .mkv
            </p>
          </>
        )}
        {selectedFile && (
          <div className="space-y-5">
            {isUploading ? (
              <div className="w-fit mx-auto">
                <CircleNotch
                  size={50}
                  weight="duotone"
                  className="fill-blue-400 animate-spin"
                />
                <p className="text-green-300 text-center">{uploadProgress}%</p>
              </div>
            ) : (
              <UploadSimple
                size={50}
                weight="duotone"
                className="mx-auto fill-green-400"
              />
            )}
            <p className="text-white overflow-hidden text-sm">
              {selectedFile?.name}
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          disabled={!selectedFile || isUploading}
          className={twMerge(
            "px-3 py-1 rounded-md bg-violet-500 text-white",
            isUploading || !selectedFile ? "brightness-50" : "",
          )}
          onClick={Clear}
        >
          Clear
        </button>
        <button
          disabled={!selectedFile || isUploading}
          onClick={() => handleUpload()}
          className={twMerge(
            "px-3 py-1 rounded-md bg-green-500 text-white",
            !selectedFile || isUploading ? "brightness-50" : "",
          )}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
