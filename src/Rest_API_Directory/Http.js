import axios from "axios";
import { getCookieIdentifier, getToken } from "../utils/authHelper";
const statusCheck = (response) => {
  if (response?.response?.status === 401) {
    // we should logout whenever user get 401 unuthorised //
  }
  return response;
};

export const requestOptionsFormData = () => {
  const token = getToken();
  return {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
      AppIdentifier: getCookieIdentifier(),
    },
  };
};
export const requestOptions = () => {
  const token = getToken();
  return {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Bearer " + token,
      AppIdentifier: getCookieIdentifier(),
    },
  };
};

export const Get = async (url) => {
  try {
    let res = await axios.get(url, requestOptions());
    return statusCheck(res);
  } catch (error) {
    statusCheck(error);
  }
};

export const FormDataPost = async (url, body) => {
  try {
    let res = await axios.post(url, body, requestOptionsFormData());
    return statusCheck(res);
  } catch (error) {
    statusCheck(error);
  }
};

export const Post = async (url, body) => {
  try {
    let res = await axios.post(url, body, requestOptions());
    return statusCheck(res);
  } catch (error) {
    statusCheck(error);
  }
};

export const Put = async (url, body) => {
  try {
    let res = await axios.put(url, body, requestOptions());
    return statusCheck(res);
  } catch (error) {
    statusCheck(error);
  }
};

export const Delete = async (url) => {
  try {
    let res = await axios.delete(url, requestOptions());
    return statusCheck(res);
  } catch (error) {
    statusCheck(error);
  }
};
