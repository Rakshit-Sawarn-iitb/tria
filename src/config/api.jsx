import axios from "axios";

export const APIInstance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const API = {
   contact:{
    getAllContacts: () => APIInstance.get('/contacts'),
    createContact: (data) => APIInstance.post('/contacts', data),
    updateContact: (id, data) => APIInstance.put(`/contacts/${id}`, data),
    deleteContact: (id) => APIInstance.delete(`/contacts/${id}`),
    getContactById: (id) => APIInstance.get(`/contacts/${id}`),
   }
};

export default API;