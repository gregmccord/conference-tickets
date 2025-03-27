import React from "react";
import infoLogo from "../assets/images/icon-info.svg";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <span style={{ color: "red", fontSize: "12px" }}>
      <img src={infoLogo} className="info" alt="info error" />
      {message}
    </span>
  );
};

export default ErrorMessage;
