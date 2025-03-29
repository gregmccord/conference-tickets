import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormData } from "../hooks/useFormData";
import heic2any from "heic2any";

interface FileWithPreview extends File {
  preview: string;
}

interface FileUploadProps {
  setImageError: React.Dispatch<React.SetStateAction<boolean>>;
  setFileRejected: React.Dispatch<React.SetStateAction<boolean>>;
}

// Max file size 5 MiB
const maxSize = 5242880;

function fileSizeValidator(file: File) {
  if (file.size > maxSize) {
    return {
      code: "file-size-too-big",
      message: `File is larger than ${maxSize} bytes.`,
    };
  }

  return null;
}

function FileUpload({ setImageError, setFileRejected }: FileUploadProps) {
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);
  const { formData, setFormData } = useFormData();

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/heic": [".heic"],
    },
    validator: fileSizeValidator,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      try {
        console.log("Began conversion");
        if (
          file.name.toLowerCase().endsWith(".heic") ||
          file.type === "image/heic"
        ) {
          // Convert HEIC to PNG using heic2any
          const convertedBlob = (await heic2any({
            blob: file,
            toType: "image/png",
            quality: 0.25,
          })) as Blob;

          const convertedFile = new File(
            [convertedBlob],
            file.name.replace(/\.heic$/i, ".png"),
            {
              type: "image/png",
              lastModified: Date.now(),
            },
          );
          console.log("Done conversion");
          const previewUrl = URL.createObjectURL(convertedFile);
          setPreviewFile(
            Object.assign(convertedFile, {
              preview: previewUrl,
            }),
          );
          setFormData({
            ...formData,
            image: Object.assign(convertedFile, {
              preview: previewUrl,
            }),
          });
          console.log("Done upload");
        } else {
          const previewUrl = URL.createObjectURL(file);
          setPreviewFile(
            Object.assign(file, {
              preview: previewUrl,
            }),
          );
          setFormData({
            ...formData,
            image: Object.assign(file, {
              preview: previewUrl,
            }),
          });
        }
        setImageError(false);
      } catch (error) {
        console.error("Error during image conversion:", error);
        setImageError(true);
      }
    },
  });

  useEffect(() => {
    setFileRejected(fileRejections.length > 0);
  }, [fileRejections, setFileRejected]);

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      {previewFile ? (
        <img
          src={previewFile.preview}
          alt="Preview"
          style={styles.preview}
          onLoad={() => {
            URL.revokeObjectURL(previewFile.preview);
          }}
        />
      ) : (
        <p style={styles.text}>Drag & Drop or Click to upload</p>
      )}
    </div>
  );
}

const styles = {
  dropzone: {
    backgroundImage:
      "linear-gradient( 45deg, rgba(255, 255, 255, 0.1) 100%, rgba(255, 255, 255, 0.3) 0%), url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23cccccc' stroke-width='1.5' stroke-dasharray='10%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e\")",
    strokeDasharray: "4px",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
    display: "flex",
    backdropFilter: "blur(15px)",
  },
  preview: {
    maxWidth: "100%",
    height: "auto",
    margin: "0 auto",
  },
  text: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#a9a9a9",
  },
};

export default FileUpload;
