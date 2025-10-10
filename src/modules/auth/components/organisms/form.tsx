import { formProps } from "@/modules/auth/dto/form.types";
import InputField from "../molecules/inputField";
import IconGoogle from "../../../../../public/googleIcon.svg"
import Image from 'next/image';

const FormOrg = ({titleOfTheForm, onClick, fields, className, btnText, googleBtnText}: formProps) => {
  return (
    <div className={className}>
      <h2>{titleOfTheForm}</h2>
      {fields.map((field, index) => (
        <InputField key={index} {...field} />
      ))}
      
      <div className="flex flex-col space-y-4">
        <span className="text-right text-[15px] text-gray-500">¿Olvidaste tu contraseña?</span>

        <button onClick={onClick} className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors mt-7">
          {btnText}
        </button>
        
        
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative bg-white px-4">
            <span className="text-sm text-gray-500 font-medium">or</span>
          </div>
        </div>
        
        <button onClick={onClick} className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
          <span><Image src={IconGoogle} width={30} height={30} alt=""/></span>
          <span>{googleBtnText}</span>
        </button>
      </div>
    </div>
  )
}

export default FormOrg;
