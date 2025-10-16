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

export const registerService = async (userData: Record<string, string>) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data; // datos que devuelve el backend tras el registro
};

export const getFormDataService = async () => {
  const response = await axios.get(`${API_URL}/form-data`);
  return response.data; // opciones para los selects (tipos de doc, géneros, etc.)
};
