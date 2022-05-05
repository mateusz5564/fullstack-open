import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then(res => res.data);
};

const create = person => {
  const req = axios.post(baseURL, person);
  return req.then(res => res.data);
};

const update = person => {
  const req = axios.put(`${baseURL}/${person.id}`, person);
  return req.then(res => res.data);
}

const remove = id => {
  return axios.delete(`${baseURL}/${id}`);
};

export default { getAll, create, update, remove };
