import axios from 'axios';
import type { SignUpFormFields } from '../model/schema';

export const requestSignUp = async (data: SignUpFormFields) => {
  const url = 'https://devtime.prokit.app';

  await axios.post(`${url}/api/signup`, data);
  return data;
};
