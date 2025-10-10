// src/features/auth/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3004/auth';

export const loginService = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // datos que devuelve el backend (ej. token, user)
};

export const forgotPasswordService = async (email: string) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data; // confirmación de envío de email
};
