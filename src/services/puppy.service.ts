import apiClient from './index';

export async function getPuppies(params: any) {
  return apiClient.get('/puppies', { params })
    .then((res) => res.data);
}

export async function createPuppy(data: any) {
  return apiClient.post('/puppies', data)
    .then((res) => res.data);
}

export async function updatePuppy(id: string, data: any) {
  return apiClient.put(`/puppies/${id}`, data)
    .then((res) => res.data);
}

export async function reorderPuppy(id: string, action: string) {
  return apiClient.post(`/puppies/${id}/order`, { action })
    .then((res) => res.data);
}
