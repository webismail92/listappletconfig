import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";



const elements = document.getElementsByClassName("staffsoff-admin-root");

for (let index = 0; index < elements.length; index++) {
  ReactDOM.render(
    <React.StrictMode>
      <App uid={elements.item(index)?.getAttribute("data-uid") || ""} />
    </React.StrictMode>,
    elements.item(index)
  );
}
reportWebVitals();
