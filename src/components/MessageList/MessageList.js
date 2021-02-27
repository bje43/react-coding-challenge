import React, { useEffect, useState } from "react";
import Api from "../../api";
import { ERROR_CODE, WARNING_CODE, INFO_CODE } from "../../constants";
import MessageColumn from "../MessageColumn/MessageColumn";
import "./styles.css";

const MessageList = () => {
  const [errorMessages, setErrorMessages] = useState([]);
  const [warningMessages, setWarningMessages] = useState([]);
  const [infoMessages, setInfoMessages] = useState([]);

  const [api, setApi] = useState(null);
  const [apiStarted, setApiStarted] = useState(false);

  useEffect(() => {
    if (!api) {
      const newApi = new Api({
        messageCallback: (message) => {
          handleMessage(message);
        },
      });

      newApi.start();
      setApi(newApi);
      setApiStarted(true);
    }
  }, [api, apiStarted]);

  const messageQueueForPriority = (messagePriority) => {
    if (messagePriority === ERROR_CODE) {
      return errorMessages;
    } else if (messagePriority === WARNING_CODE) {
      return warningMessages;
    } else if (messagePriority === INFO_CODE) {
      return infoMessages;
    }
  };

  const setMessagesForCode = (messagePriority, messages) => {
    if (messagePriority === ERROR_CODE) {
      setErrorMessages(() => [...messages]);
    } else if (messagePriority === WARNING_CODE) {
      setWarningMessages(() => [...messages]);
    } else if (messagePriority === INFO_CODE) {
      setInfoMessages(() => [...messages]);
    }
  };

  const handleClearMessage = (messageToDelete) => {
    const messages = messageQueueForPriority(messageToDelete.priority);

    const index = messages.findIndex((message) => {
      return message.id === messageToDelete.id;
    });
    if (index > -1) {
      messages.splice(index, 1);
      setMessagesForCode(messageToDelete.priority, messages);
    }
  };

  const clearAllMessages = () => {
    setErrorMessages([]);
    setWarningMessages([]);
    setInfoMessages([]);
  };

  const handleMessage = (message) => {
    switch (message.priority) {
      case ERROR_CODE:
        setErrorMessages((prevMessages) => [message, ...prevMessages]);

        break;
      case WARNING_CODE:
        setWarningMessages((prevMessages) => [message, ...prevMessages]);

        break;
      case INFO_CODE:
        setInfoMessages((prevMessages) => [message, ...prevMessages]);

        break;
      default:
    }
  };

  const startOrStopMessages = () => {
    if (apiStarted) {
      api.stop();
    } else {
      api.start();
    }

    setApiStarted(!apiStarted);
  };

  return (
    <div className="message-list-wrapper">
      <div className="button-wrapper">
        <button className="control-button" onClick={startOrStopMessages}>
          {apiStarted ? "STOP" : "START"}
        </button>
        <button className="control-button" onClick={clearAllMessages}>
          CLEAR
        </button>
      </div>

      <div className="message-columns-frame">
        <MessageColumn
          columnTitle={`Error Type ${ERROR_CODE}`}
          messages={errorMessages}
          handleClearMessage={handleClearMessage}
        />
        <MessageColumn
          columnTitle={`Warning Type ${WARNING_CODE}`}
          messages={warningMessages}
          handleClearMessage={handleClearMessage}
        />
        <MessageColumn
          columnTitle={`Info Type ${INFO_CODE}`}
          messages={infoMessages}
          handleClearMessage={handleClearMessage}
        />
      </div>
    </div>
  );
};

export default MessageList;
