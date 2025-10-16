import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UsePasswordRecoveryReturn {
  sendRecoveryEmail: (email: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const usePasswordRecovery = (): UsePasswordRecoveryReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const sendRecoveryEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Limpiar email
      const cleanEmail = email.trim().toLowerCase();

      if (!cleanEmail) {
        const msg = 'Por favor ingresa tu email';
        setError(msg);
        toast.warning(msg);
        return;
      }

      await axios.post('http://localhost:3004/auth/forgot-password', {
        email: cleanEmail,
      });

      setSuccess(true);
      toast.success('Se ha enviado un email con instrucciones para recuperar tu contraseña');

    } catch (err) {
      let errorMessage = 'Error al enviar email';

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          errorMessage = 'Email no encontrado';
        } else {
          errorMessage = err.response?.data?.message || 'Error en el servidor';
        }
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRecoveryEmail, isLoading, error, success };
};
