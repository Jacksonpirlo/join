// Tipo para opciones que pueden ser strings o objetos {value, label}
export type SelectOption = string | { value: string; label: string };

export interface inputFieldProps {
    label: string;
    value?: string;
    placeHolder: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    className?: string;
    options?: SelectOption[]; // Para campos select (acepta strings u objetos)
}