import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormData } from "../hooks/useFormData";

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
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreviewFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      setFormData({
        ...formData,
        image: Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      });
      setImageError(false);
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
