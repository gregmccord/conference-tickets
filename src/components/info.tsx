import React from "react";
import infoLogo from "../assets/images/icon-info.svg";

interface InfoMessageProps {
  message: string;
}

const InfoMessage: React.FC<InfoMessageProps> = ({ message }) => {
  return (
    <span>
      <img style={styles} src={infoLogo} className="info" alt="info error" />
      {message}
    </span>
  );
};

const styles = {
  paddingRight: "5px",
  transform: "translateY(15%)",
};

export default InfoMessage;
