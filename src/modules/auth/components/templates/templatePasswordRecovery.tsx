"use client";

import React, { useState } from "react";
import FormOrg from "../organisms/form";
import { usePasswordRecovery } from "../../hooks/usePasswordRecovery";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const TemplatePasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const { sendRecoveryEmail, isLoading, success } = usePasswordRecovery();
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    await sendRecoveryEmail(email);
  };

  const handleBackToLogin = () => {
    router.push('/auth/login');
  };

  const formProps = {
    titleOfTheForm: "INGRESA TU CORREO",
    onClick: handleSubmit,
    fields: [
      {
        label: "Email",
        value: email,
        onChange: handleEmailChange,
        placeHolder: "Ingresa tu email registrado",
        type: "email",
      },
    ],
    className:
      "min-w-[320px] max-w-[358px] w-full mx-auto p-5 bg-white rounded-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100",
    btnText: isLoading ? "ENVIANDO..." : "ENVIAR",
    googleBtnText: "",
    showForgotPassword: false, 
    showGoogleButton: false,
  };

  return (
    <div className="space-y-4">

      {success && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center">
          Email enviado exitosamente. Revisa tu bandeja de entrada.
        </div>
      )}

      {/* Formulario */}
      <FormOrg {...formProps} />

      <div className="text-center">
        <Button 
          variant="link"
          size="sm"
          onClick={handleBackToLogin}
          className="text-gray-600 hover:text-gray-800"
        >
          Volver al Login
        </Button>
      </div>
    </div>
  );
};

export default TemplatePasswordRecovery;
