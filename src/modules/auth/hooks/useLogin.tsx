import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Función para sanitizar entradas
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') 
      .replace(/["']/g, '') 
      .replace(/;/g, '') 
      .replace(/\s+/g, ' '); 
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      //Sanitización antes de enviar al servidor
      const cleanEmail = sanitizeInput(email).toLowerCase();
      const cleanPassword = sanitizeInput(password);

      console.log('Intentando hacer login con (sanitizado):', { cleanEmail });

      if (!cleanEmail || !cleanPassword) {
        const msg = 'Por favor completa todos los campos';
        setError(msg);
        toast.warning(msg);
        return;
      }

      // Llamada al servidor
      const response = await axios.post('http://localhost:3004/auth/login', {
        email: cleanEmail,
        password: cleanPassword,
      });

      console.log('LOGIN EXITOSO - Datos correctos:', response.data);
      setSuccess(true);
      toast.success('¡Login exitoso!');

      // Pequeño retraso visual antes de redirigir
      setTimeout(() => router.push('/dashboard'), 1200);
      
    } catch (err) {
      let errorMessage = 'Datos incorrectos';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          errorMessage = 'Email o contraseña incorrectos';
        } else if (err.response?.status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else {
          errorMessage = err.response?.data?.message || 'Error en el servidor';
        }
      } else if (err instanceof Error) {
        errorMessage = `Error: ${err.message}`;
      }

      setError(errorMessage);
      console.error('LOGIN FALLIDO:', errorMessage);
      toast.error(`${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, success };
};
