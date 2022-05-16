import axios from "axios";
const baseURL = "/api/persons";

const getAll = () => {
  const req = axios.get(baseURL);
  return req.then(res => res.data);
};

const getByName = (name) => {
  const req = axios.get(`${baseURL}?name=${name}`)
  return req.then(res => res.data)
}

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

export default { getAll, getByName, create, update, remove };
