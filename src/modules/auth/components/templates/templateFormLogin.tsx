"use client";

import React, { useState } from "react";
import FormOrg from "../organisms/form";
import { useLogin } from "../../hooks/useLogin";
import { useGoogleAuth } from "../../hooks/useGoogleOuth";
import { toast } from "react-toastify";

const TemplateFormLogin = () => {
  // 1. Estado: email y contraseña
  const [formData, setFormData] = useState({ email: "", password: "" });

  // 2. Hooks: login normal y Google
  const { login, isLoading } = useLogin();
  const { loginWithGoogle, isLoading: isGoogleLoading } = useGoogleAuth();

  // 3. Cambiar valor de un campo
  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  // 4. Validar y enviar
  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.warning("Por favor completa todos los campos");
      return;
    }
    await login(formData.email, formData.password);
  };

  // 5. Campos del formulario
  const fields = [
    { label: "Email", value: formData.email, onChange: handleChange("email"), placeHolder: "tu@email.com", type: "email" },
    { label: "Contraseña", value: formData.password, onChange: handleChange("password"), placeHolder: "••••••••", type: "password" },
  ];

  // 6. Renderizar
  return (
    <FormOrg
      titleOfTheForm="INICIAR SESIÓN"
      onClick={handleSubmit}
      onGoogleClick={() => loginWithGoogle()}
      fields={fields}
      className="min-w-[320px] max-w-[358px] w-full mx-auto p-5 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100"
      btnText={(isLoading || isGoogleLoading) ? "VERIFICANDO..." : "INICIAR SESIÓN"}
      googleBtnText={isGoogleLoading ? "CONECTANDO..." : "INICIAR CON GOOGLE"}
      showForgotPassword={true}
      showGoogleButton={true}
    />
  );
};

export default TemplateFormLogin;
