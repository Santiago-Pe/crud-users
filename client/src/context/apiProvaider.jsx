import { useMemo } from "react";

import ApiContext from "./apiContext";
import apiClient from "../api/apiClient";

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
