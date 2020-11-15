import { useState, useEffect } from "react";

const useImageUrlsToFiles = (
  imageUrls = [],
  fileNamePrefix = "file-preview"
) => {
  const [files, setFiles] = useState([]);
  const [isConvertingUrlsToFiles, setIsConvertingUrlsToFiles] = useState(false);

  useEffect(() => {
    setIsConvertingUrlsToFiles(true);
    const filesPromise = async () => {
      try {
        const files = [];
        for (let i = 0; i < imageUrls.length; i++) {
          let url = imageUrls[i];
          let fileRsp = await fetch(url);
          let fileContentType = fileRsp.headers.get("content-type");
          let fileType = fileContentType.split("/")[1];
          let fileName = `${fileNamePrefix}-${i + 1}.${fileType}`;
          let blob = await fileRsp.blob();
          let file = new File([blob], fileName, { type: fileContentType });
          files.push(file);
        }
        setFiles(files);
      } catch (err) {}
      setIsConvertingUrlsToFiles(false);
    };
    filesPromise();
  }, [imageUrls, fileNamePrefix]);

  return { files, isConvertingUrlsToFiles };
};

export default useImageUrlsToFiles;
