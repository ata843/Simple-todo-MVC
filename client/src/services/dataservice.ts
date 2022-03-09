// eslint-disable-next-line import/no-unresolved
import apiClient from '../http-common';

class DataService {
  getAll = (limit = 20, offset = 0) => apiClient.get(`/todo?limit=${limit}&offset=${offset}`);

  createItem = (description:string) => apiClient.post('/todo/', { description });

  updateItem = (id:string, done:boolean) => apiClient.put(`/todo/${id}`, { done });

  deleteItem = (id:string) => apiClient.delete(`/todo/${id}`);
}

export default new DataService();
