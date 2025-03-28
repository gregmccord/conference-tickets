import React from "react";
import infoLogo from "../assets/images/icon-info.svg";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <span style={styles.message}>
      <img style={styles.icon} src={infoLogo} className="info" alt="info error" />
      {message}
    </span>
  );
};

const styles = {
  message : {
    color: "red"
  },
  icon : {
    paddingRight: "5px",
    transform: "translateY(15%)",
    filter: "invert(10%) sepia(100%) saturate(7489%) hue-rotate(359deg) brightness(92%) contrast(117%)",
  }
};

export default ErrorMessage;
