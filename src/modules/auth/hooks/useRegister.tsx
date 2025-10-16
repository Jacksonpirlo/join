import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  countryPrefix: string;
  phone: string;
  contactChannel: string;
  birthDate: string;
  documentType: string;
  documentNumber: string;
  gender: string;
  department: string;
  city: string;
  password: string;
}

interface UseRegisterReturn {
  register: (data: RegisterData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('Registrando usuario (camelCase original):', data);

      // Payload con todos los campos requeridos
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        countryPrefix: data.countryPrefix,
        phone: data.phone,
        contactChannel: data.contactChannel,
        birthDate: data.birthDate,
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        gender: data.gender,
        department: data.department,
        city: data.city,
        password: data.password
      };

      console.log('Payload enviado:', payload);

      // Llamada al backend - Crea cuenta como NO VERIFICADA
      const response = await axios.post('http://localhost:3004/auth/register', payload);

      console.log('REGISTRO EXITOSO:', response.data);
      setSuccess(true);
      
      // Mensaje de éxito indicando verificación de email
      toast.success('¡Cuenta creada exitosamente! Por favor revisa tu correo para verificar tu cuenta.', {
        autoClose: 5000,
      });

      // NO redirigir automáticamente - El usuario debe verificar su email primero
      // El backend debe enviar un email con el link de verificación

    } catch (err) {
      let errorMessage = 'Error al registrarse';

      if (axios.isAxiosError(err)) {
        // Log completo del error para debugging
        console.error('ERROR COMPLETO:', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message,
          config: {
            url: err.config?.url,
            method: err.config?.method,
            data: err.config?.data
          }
        });

        if (err.response?.status === 409) {
          errorMessage = 'El email ya está registrado';
        } else if (err.response?.status === 400) {
          // Mostrar el mensaje específico del backend
          const backendMessage = err.response?.data?.message;
          errorMessage = backendMessage || 'Datos inválidos. Verifica todos los campos';
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

  return { register, isLoading, error, success };
};
