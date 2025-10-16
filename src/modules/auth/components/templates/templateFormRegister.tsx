"use client";

import React, { useState, useMemo } from "react";
import FormOrg from "../organisms/form";
import { useRegister } from "../../hooks/useRegister";
import { useFormData, CityOption } from "../../hooks/useFormData";
import { useGoogleAuth } from "../../hooks/useGoogleOuth";
import { toast } from "react-toastify";

const TemplateFormRegister = () => {
  // 1. Estado: guarda los datos que escribe el usuario
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", countryPrefix: "+57",
    phone: "", contactChannel: "", birthDate: "", documentType: "",
    documentNumber: "", gender: "", department: "", city: "", password: ""
  });

  // 2. Hooks: traen funciones y datos del backend
  const { register, isLoading } = useRegister();
  const { formOptions, isLoading: isLoadingOptions, error: formDataError } = useFormData();
  const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleAuth();

  // 3. Filtrar ciudades: solo mostrar ciudades del departamento seleccionado
  const filteredCities = useMemo(() => {
    const cities = formOptions.cities || [];
    if (!formData.department) return cities; // Sin departamento, mostrar todas
    
    const filtered = cities.filter((city: CityOption) => 
      typeof city === 'string' || 
      (city.department || city.departmentId || city.departamento) === formData.department
    );
    
    return filtered.length > 0 ? filtered : cities; // Si no hay ciudades, mostrar todas
  }, [formData.department, formOptions.cities]);

  // 4. Cambiar valor de un campo
  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => field === 'department' 
      ? { ...prev, department: value, city: '' } // Limpiar ciudad al cambiar departamento
      : { ...prev, [field]: value }
    );
  };

  // 5. Validar y enviar formulario
  const handleSubmit = async () => {
    const allFields = Object.values(formData);
    if (allFields.some(field => !field)) {
      toast.warning("Por favor completa todos los campos");
      return;
    }
    await register(formData);
  };

  // 6. Mostrar loading o error
  const containerClass = "min-w-[320px] max-w-[358px] w-full mx-auto p-8 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]";
  
  if (isLoadingOptions) return (
    <div className={containerClass}>
      <div className="text-center space-y-3">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
        <p className="text-gray-500">Cargando formulario...</p>
      </div>
    </div>
  );

  if (formDataError) return (
    <div className={containerClass}>
      <div className="text-center space-y-4">
        <div className="text-red-500 text-5xl">:(</div>
        <h3 className="text-lg font-semibold text-gray-800">Error al cargar</h3>
        <p className="text-gray-600">{formDataError}</p>
        <button onClick={() => window.location.reload()} 
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Reintentar
        </button>
      </div>
    </div>
  );

  // 7. Configuración de todos los campos del formulario
  const formFields = [
    { label: "Nombres", field: "firstName", type: "text", placeHolder: "Juan" },
    { label: "Apellidos", field: "lastName", type: "text", placeHolder: "Pérez" },
    { label: "Correo", field: "email", type: "email", placeHolder: "juan@ejemplo.com" },
    { label: "Prefijo del País", field: "countryPrefix", type: "text", placeHolder: "+57" },
    { label: "Teléfono", field: "phone", type: "tel", placeHolder: "3001234567" },
    { label: "Canal de Contacto", field: "contactChannel", type: "select", placeHolder: "Selecciona canal", options: formOptions.contactChannels || [] },
    { label: "Fecha de Nacimiento", field: "birthDate", type: "date", placeHolder: "" },
    { label: "Tipo de Documento", field: "documentType", type: "select", placeHolder: "Selecciona tipo", options: formOptions.documentTypes },
    { label: "Número de Documento", field: "documentNumber", type: "text", placeHolder: "1234567890" },
    { label: "Género", field: "gender", type: "select", placeHolder: "Selecciona género", options: formOptions.genders },
    { label: "Departamento", field: "department", type: "select", placeHolder: "Selecciona departamento", options: formOptions.departments },
    { label: "Ciudad", field: "city", type: "select", placeHolder: formData.department ? "Selecciona ciudad" : "Primero selecciona departamento", options: filteredCities },
    { label: "Contraseña", field: "password", type: "password", placeHolder: "••••••••" },
  ];

  // 8. Renderizar formulario
  return (
    <FormOrg
      titleOfTheForm="REGISTRARSE"
      onClick={handleSubmit}
      onGoogleClick={() => loginWithGoogle()}
      fields={formFields.map(f => ({
        label: f.label,
        value: formData[f.field as keyof typeof formData],
        onChange: handleChange(f.field as keyof typeof formData),
        placeHolder: f.placeHolder,
        type: f.type,
        options: f.options
      }))}
      className="min-w-[320px] max-w-[358px] w-full mx-auto p-5 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100"
      btnText={(isLoading || isGoogleLoading) ? "REGISTRANDO..." : "REGISTRARSE"}
      googleBtnText={isGoogleLoading ? "CONECTANDO..." : "REGISTRARSE CON GOOGLE"}
      showGoogleButton={true}
      showForgotPassword={false}
    />
  );
};

export default TemplateFormRegister;
