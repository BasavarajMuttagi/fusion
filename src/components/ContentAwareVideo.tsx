import React, { useState, useRef } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { trim } from "@cloudinary/url-gen/actions/videoEdit";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react";

interface ContentAwareVideoProps {
  publicId: string;
  cloudName: string;
}

const ContentAwareVideo: React.FC<ContentAwareVideoProps> = ({
  publicId,
  cloudName,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const cld = new Cloudinary({ cloud: { cloudName } });

  // Full video URL
  const fullVideoUrl = cld.video(publicId).toURL();

  // Preview video URL (10 second clip starting at 0 seconds)
  const previewVideoUrl = cld
    .video(publicId)
    .videoEdit(trim().duration(10.0).startOffset(0.0))
    .toURL();

  const onHover = (play: boolean) => {
    if (videoPreviewRef.current) {
      if (play) {
        videoPreviewRef.current.play().catch((error) => {
          console.warn("Error playing video:", error);
        });
      } else {
        videoPreviewRef.current.pause();
        videoPreviewRef.current.currentTime = 0;
      }
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsExpanded(true);
    onHover(false);
  };

  return (
    <>
      <div
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={handleClick}
        className="cursor-pointer"
      >
        <video ref={videoPreviewRef} src={previewVideoUrl} loop playsInline>
          Your browser does not support the video tag.
        </video>
      </div>
      {isExpanded &&
        createPortal(
          <div
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 p-3"
            onClick={(e) => {
              e.stopPropagation();
            }} // Prevent click from closing the modal if desired
          >
            <div className="relative">
              <video
                ref={videoRef}
                src={fullVideoUrl}
                controls
                autoPlay
                className="aspect-video h-96"
              >
                Your browser does not support the video tag.
              </video>
              <X
                size={20}
                weight="bold"
                className="text-white absolute -top-4 -right-4 rounded-full bg-black cursor-pointer"
                onClick={() => setIsExpanded(false)}
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default ContentAwareVideo;
