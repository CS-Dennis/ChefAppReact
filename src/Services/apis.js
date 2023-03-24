import axios from "axios"
import { serverURL } from "./config";

export const getRecipesByUserId = (userId) => {
  const payload = { id: userId };
  return axios.post(serverURL + "/api/recipes/getbyuserid", payload);
}

export const uploadFile = (file) => {
  return axios({
    method: "post",
    url: serverURL + "/api/recipes/uploadfile",
    data: file,
    headers: { "Content-Type": "multipart/form-data" }
  });
}

export const createRecipe = (recipe) => {
  return axios.post(serverURL + "/api/recipes/create", recipe);
}

export const deleteRecipe = ({ recipeId }) => {
  return axios.post(serverURL + "/api/recipes/delete", { recipeId });
}