import { CircleNotch, UploadSimple, X } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import apiClient from "../axios/apiClient";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const UploadVideo = ({
  closeDialog,
  setIsUploadSuccess,
}: {
  closeDialog: Dispatch<SetStateAction<boolean>>;
  setIsUploadSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const handleUploadSuccess = () => {
    closeDialog(false);
    setIsUploadSuccess(true);
  };

  const Clear = () => {
    setSelectedFile(null);
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setUploadProgress(0);
    setIsUploading(false);
    setAbortController(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const controller = new AbortController();
    setAbortController(controller);
    try {
      setIsUploading(true);
      const result = await apiClient.post("/cloudinary/signature", {
        fileName: selectedFile?.name,
      });
      const { signature, timestamp, upload_preset, folder, public_id } =
        result.data as {
          signature: string;
          timestamp: number;
          userId: string;
          upload_preset: string;
          public_id: string;
          folder: string;
        };

      await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/auto/upload`,
        {
          file: selectedFile,
          api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
          signature,
          timestamp,
          upload_preset,
          folder,
          public_id,
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

      handleUploadSuccess();
    } catch (error) {
      if (axios.isCancel(error)) {
        toast.success("Upload canceled");
      } else {
        toast.error("Something Went Wrong");
        console.log(error);
      }
    } finally {
      setIsUploading(false);
      setAbortController(null);
    }
  };

  const handleCancelUpload = () => {
    if (abortController) {
      abortController.abort();
      setUploadProgress(0);
      setIsUploading(false);
      toast.success("Upload canceled");
    }
  };

  const handleCloseDialog = () => {
    if (isUploading) {
      if (
        window.confirm(
          "An upload is in progress. Are you sure you want to cancel?",
        )
      ) {
        handleCancelUpload();
        closeDialog(false);
      }
    } else {
      closeDialog(false);
    }
  };

  return (
    <div className="max-w-lg w-full bg-neutral-800 h-96 rounded-md flex flex-col justify-between p-4 border-2 border-neutral-700/30">
      <div className="flex justify-end">
        <div
          className="p-1 rounded-full bg-zinc-100 cursor-pointer"
          onClick={() => handleCloseDialog()}
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
        <button
          disabled={!isUploading}
          onClick={handleCancelUpload}
          className={twMerge(
            "px-3 py-1 rounded-md bg-red-500 text-white",
            !isUploading ? "brightness-50" : "",
          )}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
