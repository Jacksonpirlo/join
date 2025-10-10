
import { inputFieldProps } from "@/modules/auth/dto/inputProps.type";
import Label from "../atoms/label";
import { Input } from "../ui/input";

const InputField = ({label, value, onChange, placeHolder, type, className}: inputFieldProps) => {
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
