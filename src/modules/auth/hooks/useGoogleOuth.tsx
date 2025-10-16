import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// Hook para login y register con Google
export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Manejar respuesta exitosa de Google
  const handleGoogleSuccess = async (tokenResponse: { access_token: string }) => {
    setIsLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';
      
      console.log('Enviando token a backend...');
      console.log('URL:', `${apiUrl}/auth/google`);
      
      // Enviar token INMEDIATAMENTE al backend (expira rápido)
      const { data } = await axios.post(
        `${apiUrl}/auth/google`, // Ruta correcta sin /api
        { 
          token: tokenResponse.access_token,
          tokenType: 'access_token' 
        },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 
        }
      );

      console.log('Respuesta del backend:', data);

      // Guardar JWT de TU backend (no el de Google)
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Mensaje según si es nuevo usuario
      const mensaje = data.isNewUser 
        ? `¡Cuenta creada! Bienvenido ${data.user.firstName}!`
        : `¡Bienvenido de nuevo ${data.user.firstName}!`;
      toast.success(mensaje);

      // Redirigir
      router.push('/dashboard');

    } catch (error: unknown) {
      const err = error as { response?: { data?: unknown; status?: number } };
      console.error('Error completo:', error);
      console.error('Respuesta:', err.response?.data);
      console.error('Status:', err.response?.status);
      
      if (err.response?.status === 401) {
        toast.error('Token expirado o inválido. Intenta de nuevo.');
      } else {
        toast.error('Error al autenticar con Google. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Configurar login de Google (flow implicit para obtener access_token)
  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => toast.error('Error al conectar con Google'),
    flow: 'implicit', // Obtiene access_token directamente
  });

  return { loginWithGoogle, isLoading };
};