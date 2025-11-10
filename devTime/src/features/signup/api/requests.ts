import axios from 'axios';
import type { SignUpFormFields } from '../model/schema';

const url = import.meta.env.VITE_API_BASE_URL;

export const requestSignUp = async (data: SignUpFormFields) => {
  const response = await axios.post(`${url}/api/signup`, data);

  return response.data;
};

export const requestEmailCheck = async (email: string) => {
  const response = await axios.get(`${url}/api/signup/check-email`, {
    params: { email },
  });

  return response.data;
};

export const requestNicknameCheck = async (nickname: string) => {
  const response = await axios.get(`${url}/api/signup/check-nickname`, {
    params: { nickname },
  });

  return response.data;
};
