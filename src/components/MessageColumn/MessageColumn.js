import React from "react";
import MessageCard from "../MessageCard/MessageCard";
import "./styles.css";

const MessageColumn = ({ columnTitle, messages, handleClearMessage }) => {
  return (
    <div className="message-column">
      <div className="message-column-title">{columnTitle}</div>
      <div className="message-column-subtitle">Count {messages.length}</div>
      {messages.map((message) => {
        return (
          <MessageCard
            key={message.id}
            handleClearMessage={handleClearMessage}
            message={message}
          />
        );
      })}
    </div>
  );
};

export default MessageColumn;
