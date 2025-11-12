import axios from 'axios';

const url = import.meta.env.VITE_API_BASE_URL;

export const requestLogin = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${url}/api/auth/login`, data);

  return response.data;
};
