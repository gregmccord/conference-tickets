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
      "image/*": [".png"]
    },
    validator: fileSizeValidator,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      try {
        console.log("Began conversion");
        if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
          // Convert HEIC to PNG using heic2any
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/png',
            quality: 0.25
          }) as Blob;
  
          const convertedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, '.png'), {
            type: 'image/png',
            lastModified: Date.now()
          });
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
        <p>Drag & Drop or Click to upload</p>
      )}
    </div>
  );
}

const styles = {
  dropzone: {
    border: "1px dashed #ccc",
    borderRadius: "8px",
    padding: "20px",
    // text-align: "center",
    cursor: "pointer",
    transition: "border-color 0.3s ease",
  },
  preview: {
    maxWidth: "100%",
    height: "auto",
    marginTop: "10px",
  },
};

export default FileUpload;
