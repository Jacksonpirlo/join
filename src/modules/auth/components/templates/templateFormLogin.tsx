"use client";

import React, { useState } from "react";
import FormOrg from "../organisms/form";
import { useLogin } from "../../hooks/useLogin";
import { toast } from "react-toastify";

const TemplateFormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading, error, success } = useLogin();

  //Maneja los cambios en los inputs
  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  //Envía el formulario
  const handleSubmit = async () => {
    console.log("Enviando datos:", formData);

    if (!formData.email || !formData.password) {
      toast.warning("Por favor completa todos los campos");
      return;
    }

    await login(formData.email, formData.password);
  };

  //Props del formulario (para tu FormOrg)
  const formProps = {
    titleOfTheForm: "Sign In",
    onClick: handleSubmit,
    fields: [
      {
        label: "Gmail",
        value: formData.email,
        onChange: handleInputChange("email"),
        placeHolder: "Enter your email",
        type: "email",
      },
      {
        label: "Password",
        value: formData.password,
        onChange: handleInputChange("password"),
        placeHolder: "Enter your password",
        type: "password",
      },
    ],
    className:
      "min-w-[320px] max-w-[358px] w-full mx-auto p-5 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100",
    btnText: isLoading ? "VERIFICANDO..." : "LOGIN",
    googleBtnText: "SIGN IN WITH GOOGLE",
  };

  return (
    <div className="space-y-4">
      {/*Mensajes de estado */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center">
           {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
        ¡Login exitoso!
        </div>
      )}

      {/*Render del formulario */}
      <FormOrg {...formProps} />
    </div>
  );
};

export default TemplateFormLogin;
