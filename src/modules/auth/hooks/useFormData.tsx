import { useState, useEffect } from 'react';
import axios from 'axios';

// Tipo para opciones que pueden ser strings o objetos {value, label}
type SelectOption = string | { value: string; label: string };

// Tipo para ciudades que incluyen el departamento al que pertenecen
export type CityOption = string | { value: string; label: string; department?: string; departmentId?: string; departamento?: string };

interface FormDataOptions {
  documentTypes: SelectOption[];
  genders: SelectOption[];
  contactChannels: SelectOption[];
  departments: SelectOption[];
  cities: CityOption[];
}

export const useFormData = () => {
  const [formOptions, setFormOptions] = useState<FormDataOptions>({
    documentTypes: [],
    genders: [],
    contactChannels: [],
    departments: [],
    cities: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:3004/auth/form-data', {
          timeout: 5000
        });
        
        let backendData = response.data;
        
        // Si el backend envuelve los datos en una propiedad 'data'
        if (backendData.data && typeof backendData.data === 'object') {
          backendData = backendData.data;
        }

        const formData = {
          documentTypes: backendData.documentTypes || backendData.document_types || [],
          genders: backendData.genders || [],
          contactChannels: backendData.contactChannels || backendData.contact_channels || [],
          departments: backendData.departments || backendData.departamentos || [],
          cities: backendData.cities || backendData.ciudades || backendData.city || [],
        };
        
        setFormOptions(formData);

      } catch (err) {
        const errorMessage = axios.isAxiosError(err) && err.code === 'ECONNABORTED'
          ? 'Tiempo de espera agotado. El backend no está disponible.'
          : 'Error al cargar opciones del formulario. El backend no está disponible.';
        
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFormData();
  }, []);

  return { formOptions, isLoading, error };
};
