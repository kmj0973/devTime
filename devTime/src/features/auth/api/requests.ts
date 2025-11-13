import axios from 'axios';

const url = import.meta.env.VITE_API_BASE_URL;

export const requestLogin = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${url}/api/auth/login`, data);

  return response.data;
};

export const requestLogout = async (accessToken: string) => {
  const response = await axios.post(
    `${url}/api/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

export const requestProfileData = async (accessToken: string) => {
  const response = await axios.get(`${url}/api/profile`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  console.log(response.data);

  return response.data;
};
