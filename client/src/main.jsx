import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import store from "./reudx/store/sotre.js";
import ApiProvider from "./context/apiProvaider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <Provider store={store}>
          <ConfigProvider
            theme={{
              token: {
                borderRadius: 8,
              },
            }}
          >
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ConfigProvider>
        </Provider>
      </ApiProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
