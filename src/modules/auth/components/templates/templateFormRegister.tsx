"use client";

import React, { useState, useMemo } from "react";
import FormOrg from "../organisms/form";
import { useRegister } from "../../hooks/useRegister";
import { useFormData, CityOption } from "../../hooks/useFormData";
import { toast } from "react-toastify";

const TemplateFormRegister = () => {
  // Estado del formulario - todos los campos que el usuario llena
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryPrefix: "+57",
    phone: "",
    contactChannel: "",
    birthDate: "",
    documentType: "",
    documentNumber: "",
    gender: "",
    department: "",
    city: "",
    password: "",
  });

  // Hooks para registro y opciones del backend
  const { register, isLoading } = useRegister();
  const { formOptions, isLoading: isLoadingOptions, error: formDataError } = useFormData();

  // Filtrar ciudades según departamento seleccionado
  const filteredCities = useMemo(() => {
    const cities = formOptions.cities || [];
    if (!formData.department) return cities;

    const filtered = cities.filter((city: CityOption) => {
      if (typeof city === 'string') return true;
      return (city.department || city.departmentId || city.departamento) === formData.department;
    });

    return filtered.length > 0 ? filtered : cities;
  }, [formData.department, formOptions.cities]);

  // Actualizar un campo del formulario
  const handleInputChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    
    // Si cambia departamento, limpiar ciudad
    if (field === 'department') {
      setFormData({ ...formData, department: newValue, city: '' });
    } else {
      setFormData({ ...formData, [field]: newValue });
    }
  };

  // Enviar formulario
  const handleSubmit = async () => {
    // Validar que todos los campos estén llenos
    const requiredTextFields = [
      formData.firstName, formData.lastName, formData.email,
      formData.countryPrefix, formData.phone, formData.birthDate,
      formData.documentNumber, formData.password
    ];

    const requiredSelectFields = [
      formData.documentType, formData.contactChannel, formData.gender,
      formData.department, formData.city
    ];

    if (requiredTextFields.some(field => !field)) {
      toast.warning("Por favor completa todos los campos de texto");
      return;
    }

    if (requiredSelectFields.some(field => !field)) {
      toast.warning("Por favor selecciona todas las opciones");
      return;
    }

    await register(formData);
  };

  // Mostrar loading mientras carga opciones
  if (isLoadingOptions) {
    return (
      <div className="min-w-[320px] max-w-[358px] w-full mx-auto p-8 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto"></div>
          <p className="text-gray-500">Cargando formulario...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si falla el backend
  if (formDataError) {
    return (
      <div className="min-w-[320px] max-w-[358px] w-full mx-auto p-8 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-5xl">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800">Error al cargar el formulario</h3>
          <p className="text-gray-600">{formDataError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Configuración de campos del formulario
  const formFields = [
    { label: "Nombres", value: formData.firstName, field: "firstName", type: "text", placeHolder: "RIWI" },
    { label: "Apellidos", value: formData.lastName, field: "lastName", type: "text", placeHolder: "JOIN" },
    { label: "Correo", value: formData.email, field: "email", type: "email", placeHolder: "Riwi@hotmail.com" },
    { label: "Prefijo del País", value: formData.countryPrefix, field: "countryPrefix", type: "text", placeHolder: "+57" },
    { label: "Numero Telefonico", value: formData.phone, field: "phone", type: "tel", placeHolder: "3208754367" },
    { label: "Canal de Contacto Preferido", value: formData.contactChannel, field: "contactChannel", type: "select", placeHolder: "Selecciona canal de contacto", options: formOptions.contactChannels || [] },
    { label: "Fecha de Nacimiento", value: formData.birthDate, field: "birthDate", type: "date", placeHolder: "23/06/2001" },
    { label: "Tipo de Documento", value: formData.documentType, field: "documentType", type: "select", placeHolder: "Selecciona tipo de documento", options: formOptions.documentTypes },
    { label: "Numero de Documento", value: formData.documentNumber, field: "documentNumber", type: "text", placeHolder: "123029192" },
    { label: "Genero", value: formData.gender, field: "gender", type: "select", placeHolder: "Selecciona género", options: formOptions.genders },
    { label: "Departamento", value: formData.department, field: "department", type: "select", placeHolder: "Selecciona departamento", options: formOptions.departments },
    { label: "Ciudad", value: formData.city, field: "city", type: "select", placeHolder: formData.department ? "Selecciona ciudad" : "Primero selecciona un departamento", options: filteredCities },
    { label: "Contraseña", value: formData.password, field: "password", type: "password", placeHolder: "••••••••••••" },
  ];

  return (
    <div className="space-y-4">
      <FormOrg
        titleOfTheForm="REGISTRARSE"
        onClick={handleSubmit}
        fields={formFields.map(f => ({
          label: f.label,
          value: f.value,
          onChange: handleInputChange(f.field as keyof typeof formData),
          placeHolder: f.placeHolder,
          type: f.type,
          options: f.options
        }))}
        className="min-w-[320px] max-w-[358px] w-full mx-auto p-5 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100"
        btnText={isLoading ? "REGISTRANDO..." : "REGISTRARSE"}
        googleBtnText="REGISTRARSE CON GOOGLE"
        showGoogleButton={true}
      />
    </div>
  );
};

export default TemplateFormRegister;
