import { useState } from "react";
import AWS from 'aws-sdk';

export const useUploadFile = (directoryPath: string) => {

  const s3 = new AWS.S3();
  const [file, setFile] = useState<File | null>();

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  }

  const uploadToS3 = async () => {
    if (!file) {
      return;
    }
    const params = { 
      Bucket: 'giovannyarias-drive', 
      Key: `${directoryPath}/${Date.now()}-${file.name}`,
      Body: file,
      ContentType: file.type
    };
    const { Location } = await s3.upload(params).promise().then();
    setFile(null);
    return Location;
  }

  return { file, selectFile, uploadToS3 };
}