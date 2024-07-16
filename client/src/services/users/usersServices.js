// src/api/apiService.js
export const fetchUsers = async (client, filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const queryParams = new URLSearchParams(filters).toString();
  const response = await client.get(`/users?${queryParams}`);
  return { data: response.data, totalUsers: response.headers["x-total-count"] };
};

export const createUser = async (client, user) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await client.post("/users", user);
  return response.data;
};

export const updateUser = async (client, userId, user) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await client.put(`/users/${userId}`, user);
  return response.data;
};

export const deleteUser = async (client, userId) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await client.delete(`/users/${userId}`);
};
