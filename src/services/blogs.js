import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = "";
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (payload) => {
  const response = await axios.post(baseUrl, payload, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const update = async (id, payload) => {
  const response = await axios.put(`${baseUrl}/${id}`, payload, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export default { getAll, setToken, create, update, remove };
