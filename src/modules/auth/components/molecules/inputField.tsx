
import { inputFieldProps } from "@/modules/auth/dto/inputProps.type";
import Label from "../atoms/label";
import { Input } from "../ui/input";

const InputField = ({label, value, onChange, placeHolder, type, className, options}: inputFieldProps) => {
  // Si es un select, renderizamos un select en lugar de un input
  if (type === "select" && options && options.length > 0) {
    return (
      <div className="mt-5 mb-2 rounded-[1px]">
        <Label className="mb-2 text-black" text={label} />
        <select
          value={value}
          onChange={onChange}
          className={`w-full h-9 px-3 py-1 rounded-md border border-input bg-background text-sm placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-ring ${className || ''}`}
        >
          <option value="" disabled>
            {placeHolder || `Selecciona ${label.toLowerCase()}`}
          </option>
          {options.map((option, index) => {
            // Manejar opciones como objetos {value, label} o como strings
            const optionValue = typeof option === 'string' ? option : option.value;
            const optionLabel = typeof option === 'string' ? option : option.label;
            
            // Usar index como fallback si el value no existe o es undefined
            const keyValue = optionValue || `option-${index}`;
            
            return (
              <option key={keyValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  // Si es un select pero no tiene opciones, mostrar input temporal
  if (type === "select" && (!options || options.length === 0)) {
    return (
      <div className="mt-5 mb-2 rounded-[1px]">
        <Label className="mb-2 text-black" text={label} />
        <div className="w-full h-9 px-3 py-2 rounded-md border border-input bg-gray-100 text-sm text-gray-500 flex items-center">
          Cargando opciones...
        </div>
      </div>
    );
  }

  // Input normal
  return (
    <div className="mt-5 mb-2 rounded-[1px]">
        <Label className="mb-2 text-black" text={label} />
        <Input 
          value={value} 
          onChange={onChange}
          placeholder={placeHolder}
          type={type as React.HTMLInputTypeAttribute}
          className={`w-full placeholder:text-gray-700 ${className || ''}`}
        />
    </div>
  )
}

export default InputField;
