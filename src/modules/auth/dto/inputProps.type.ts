export interface inputFieldProps {
    label: string;
    value?: string;
    placeHolder: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}