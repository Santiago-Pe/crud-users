import { createContext } from "react";
//import apiClient from "../api/apiClient";
import axios from "axios";
const ApiContext = createContext({
  api: axios.create(),
});

export default ApiContext;
