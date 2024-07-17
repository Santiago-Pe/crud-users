import { createContext } from "react";

import axios from "axios";
const ApiContext = createContext({
  api: axios.create(),
});

export default ApiContext;
