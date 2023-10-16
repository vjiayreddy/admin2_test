import S3 from "react-aws-s3";
import { useState } from "react";

export const useS3Upload = () => {
  const [s3ImagePath, setS3ImagePath] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isImageUpload, setIsImageUpload] = useState(null);
  const uploadImageIntoS3 = (dirPath, pictureName, file) => {
    setIsImageUpload(true);
    const config = {
      bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
      accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESSKEY,
      dirName: dirPath,
      region: process.env.NEXT_PUBLIC_REGION,
    };
    const ReactS3Client = new S3(config);
    return new Promise((resolve, reject) => {
      ReactS3Client.uploadFile(file, pictureName)
        .then((data) => {
          setIsImageUpload(false);
          if (data.status === 204) {
            resolve(data);
            setS3ImagePath(data.location);
            setUploadedImages([data.location]);
            let images = [...uploadedImages];
            setUploadedImages([...images, data.location]);
            alert("Image upload successfully");
          } else {
            reject("Error");
          }
        })
        .catch((error) => {
          setIsImageUpload(false);
          reject(error);
          alert("Something went wrong please try again");
        });
    });
  };
  return {
    uploadImageIntoS3,
    s3ImagePath,
    setS3ImagePath,
    isImageUpload,
    uploadedImages,
  };
};

export const uploadToS3 = (dirPath, pictureName, file) => {
  const config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESSKEY,
    dirName: dirPath,
    region: process.env.NEXT_PUBLIC_REGION,
  };
  const ReactS3Client = new S3(config);
  return new Promise((resolve, reject) => {
    ReactS3Client.uploadFile(file, pictureName)
      .then((data) => {
        if (data.status === 204) {
          resolve(data);
        } else {
          reject("Error");
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteS3dImage = (dirPath, pictureName) => {
  const config = {
    bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME,
    accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESSKEY,
    dirName: dirPath,
    region: process.env.NEXT_PUBLIC_REGION,
  };
  const ReactS3Client = new S3(config);
  return new Promise((resolve, rejects) => {
    ReactS3Client.deleteFile(pictureName)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        rejects(error);
      });
  });
};
