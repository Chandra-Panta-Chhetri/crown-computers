import { useState, useEffect } from "react";

const useImageUrlsToFiles = (imageUrls = [], fileName = "file-to-upload") => {
  const [files, setFiles] = useState([]);
  const [isConvertingUrlsToFiles, setIsConvertingUrlsToFiles] = useState(false);

  useEffect(() => {
    setIsConvertingUrlsToFiles(true);
    const filesPromise = async () => {
      try {
        const files = [];
        for (let url of imageUrls) {
          let fileRsp = await fetch(url);
          let fileContentType = fileRsp.headers.get("content-type");
          let blob = await fileRsp.blob();
          let file = new File([blob], fileName, { type: fileContentType });
          files.push(file);
        }
        setFiles(files);
      } catch (err) {}
      setIsConvertingUrlsToFiles(false);
    };
    filesPromise();
  }, [imageUrls]);

  return { files, isConvertingUrlsToFiles };
};

export default useImageUrlsToFiles;
