import React from "react";
import ReactDOM from "react-dom";
import MessageList from "./components/MessageList/MessageList";

const NewApp = require("./components/MessageList/MessageList").default;

function renderApp(App) {
  ReactDOM.render(<App />, document.getElementById("root"));
}

renderApp(MessageList);

if (module.hot) {
  module.hot.accept("./components/MessageList/MessageList", () => {
    renderApp(NewApp);
  });
}
