import React from "react";
import { ERROR_CODE, WARNING_CODE, INFO_CODE } from "../../constants";
import "./styles.css";

const MessageCard = ({ message, handleClearMessage }) => {
  const cardColor = (messagePriority) => {
    if (messagePriority === ERROR_CODE) {
      return "#F56236";
    } else if (messagePriority === WARNING_CODE) {
      return "#FCE788";
    } else if (messagePriority === INFO_CODE) {
      return "#88FCA3";
    } else return "#808080";
  };

  return (
    <div
      className="message-card"
      style={{ backgroundColor: cardColor(message.priority) }}
    >
      <div className="content-wrapper">
        <div className="content">{message.message}</div>
        <div
          onClick={() => handleClearMessage(message)}
          className="clear-button"
        >
          Clear
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
