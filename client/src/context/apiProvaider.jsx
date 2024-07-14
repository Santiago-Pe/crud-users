import ApiContext from "./apiContext";
import apiClient from "../api/apiClient";

import { useMemo } from "react";
// eslint-disable-next-line react/prop-types
const ApiProvider = ({ children }) => {
  const apiConfig = useMemo(() => {
    return {
      client: apiClient,
    };
  }, []);

  return (
    <ApiContext.Provider value={apiConfig}>{children}</ApiContext.Provider>
  );
};

export default ApiProvider;
