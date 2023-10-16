import React from "react";
import Uppy from "@uppy/core";
import { DashboardModal, useUppy, Dashboard } from "@uppy/react";
import ImageEditor from "@uppy/image-editor";
import Aws3 from "@uppy/aws-s3";
import Webcam from "@uppy/webcam";
import ScreenCapture from "@uppy/screen-capture";
import ThumbnailGenerator from "@uppy/thumbnail-generator";
import Compressor from "@uppy/compressor";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import "@uppy/screen-capture/dist/style.css";

const UploadFiles = ({
  openModel,
  onComplete,
  path,
  allowedFileTypes,
  maxNumberOfFiles,
}) => {
  const uppy = useUppy(() => {
    const uppy = new Uppy({
      id: "uppy",
      autoProceed: false,
      allowMultipleUploads: false,
      restrictions: {
        maxNumberOfFiles: maxNumberOfFiles ? maxNumberOfFiles : 3,
        maxFileSize: 20000000, // 20 MB
        allowedFileTypes: allowedFileTypes ? allowedFileTypes : null,
      },
      infoTimeout: 5000,
      locale: {
        strings: {},
      },
      onBeforeUpload: (files) => {
        for (var prop in files) {
          const rand = 1 + Math.random() * (1000 - 1);
          const _value = Math.ceil(rand);
          files[prop].name = `${path}/` + _value + files[prop].name;
          files[prop].meta.name = `${path}/` + _value + files[prop].meta.name;
        }
        return files;
      },
    })
      .use(Webcam, {
        countdown: true,
        modes: ["video-audio", "video-only", "audio-only", "picture"],
        mirror: false,
        showRecordingLength: true,
        facingMode: "environment",
        showVideoSourceDropdown: true,
        videoConstraints: {
          facingMode: "environment",
        },
      })
      .use(ScreenCapture, {
        displayMediaConstraints: {
          video: {
            width: 1280,
            height: 720,
            frameRate: {
              ideal: 3,
              max: 5,
            },
            cursor: "motion",
            displaySurface: "monitor",
          },
        },
        userMediaConstraints: {
          audio: true,
        },
        preferredVideoMimeType: "video/webm",
      })
      .use(ImageEditor, {
        id: "ImageEditor",
        quality: 0.3,
        cropperOptions: {
          viewMode: 1,
          aspectRatio: 1,
          background: false,
          responsive: true,
          autoCropArea: 0.8,
          autoCrop: true,
        },
        actions: {
          revert: true,
          rotate: true,
          flip: true,
          zoomIn: true,
          zoomOut: true,
          cropSquare: true,
          cropWidescreen: true,
          cropWidescreenVertical: true,
        },
      })
      .use(Aws3, {
        limit: 4,
        companionUrl: "https://api.mpfstyleclub.com:3020",
      })
      .use(Compressor, {
        quality: 0.3,
        limit: 10,
      })
      .use(ThumbnailGenerator, {
        id: "ThumbnailGenerator",
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        thumbnailType: "image/jpeg",
        waitForThumbnailsBeforeUpload: false,
      });

    uppy.setOptions({
      locale: {
        strings: {
          cancel: "Cancel",
          done: "Cancel",
        },
      },
    });

    uppy.on("upload", () => {
      console.log("upload");
    });

    uppy.on("complete", (result) => {
      onComplete(result);
    });
    return uppy;
  });

  return (
    <Dashboard
      uppy={uppy}
      id="uppy-upload"
      note="File size must not exceed 20 MB"
      plugins={["Webcam", "ScreenCapture", "ImageEditor"]}
    />
  );
};

export default UploadFiles;
