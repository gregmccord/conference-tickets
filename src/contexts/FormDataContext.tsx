import React, { createContext, useState, ReactNode } from "react";

type FormData = {
  image: File | null;
  name: string;
  email: string;
  gitHub: string;
  ticketNumber: string;
};

const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined,
);

export { FormDataContext };

export type FormDataContextType = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

export const FormDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [formData, setFormData] = useState<FormData>({
    image: null,
    name: "",
    email: "",
    gitHub: "",
    ticketNumber: "",
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
