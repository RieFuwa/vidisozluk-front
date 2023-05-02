import axios from "axios";

export const PostWithAuth = (url, parameters) => {
  var request = axios.post(url, parameters, {
    headers: { Authorization: localStorage.getItem("token") },
  });
  return request;
};

export const DeleteWithAuth = (url, parameters) => {
  var request = axios.delete(url, parameters, {
    headers: { Authorization: localStorage.getItem("token") },
  });

  return request;
};

export const GetWithAuth = (url, parameters) => {
  var request = axios.get(url, parameters, {
    headers: { Authorization: `${localStorage.getItem("token")}` },
  });

  return request;
};

export const GetWithAllUser = (url, parameters) => {
  var request = axios.get(url, parameters, {
    headers: { Authorization: `${localStorage.getItem("token")}` },
    body: JSON.stringify({
      roles: ["ROLE_ADMIN"],
    }),
  });
  return request;
};
