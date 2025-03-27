import { useContext } from "react";
import { FormDataContext } from "../contexts/FormDataContext";

export const useFormData = () => {
  const context = useContext(FormDataContext);

  if (!context) {
    throw new Error("useFormData must be used within a FormDataProvider");
  }

  return context;
};
