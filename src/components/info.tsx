import React from "react";
import infoLogo from "../assets/images/icon-info.svg";

interface InfoMessageProps {
  message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message }) => {
  return (
    <span>
      <img src={infoLogo} className="info" alt="info error" />
      {message}
    </span>
  );
};

export default InfoMessage;
