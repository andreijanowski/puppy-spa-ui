import apiClient from './index';

export async function getWaitLists(params: any) {
  return apiClient.get('/wait-lists', { params })
    .then((res) => res.data);
}

export async function findWaitListByDate(date: string) {
  return apiClient.get(`/wait-lists/check-date?date=${date}`)
    .then((res) => res.data);
}

export async function createWaitList(data: any) {
  return apiClient.post('/wait-lists', data)
    .then((res) => res.data);
}
