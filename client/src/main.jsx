import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";

import { App as AntApp } from "antd";

import App from "./App.jsx";
import store from "./reudx/store/sotre.js";
import ApiProvider from "./context/apiProvaider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              borderRadius: 8,
            },
            components: {
              Modal: {
                wireframe: true,
              },
            },
          }}
        >
          <BrowserRouter>
            <AntApp>
              <App />
            </AntApp>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
