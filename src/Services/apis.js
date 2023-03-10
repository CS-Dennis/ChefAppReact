import axios from "axios"
import { serverURL } from "./config";

export const getRecipesByUserId = (userId) => {
  const payload = { id: userId };
  return axios.post(serverURL + "/api/recipes/getbyuserid", payload);
}