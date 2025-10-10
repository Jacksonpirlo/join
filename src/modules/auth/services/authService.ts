// src/features/auth/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3004/auth';

export const loginService = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // datos que devuelve el backend (ej. token, user)
};
