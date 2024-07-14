// src/api/apiService.js
export const fetchUsers = async (client) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await client.get("/users");
  return response.data;
};
