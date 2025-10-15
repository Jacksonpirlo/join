import { labelProps } from "@/modules/auth/dto/label.type"

const Label = ({text, className}: labelProps) => {
  return (
    <div className={className}>{text}</div>
  )
}

export default Label;
