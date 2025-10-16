import { inputFieldProps } from './inputProps.type';

export interface formProps {
    titleOfTheForm: string;
    onClick?: ()=> void;
    onGoogleClick?: ()=> void; // Función para el botón de Google
    fields: inputFieldProps[];
    className: string;
    btnText: string;
    googleBtnText: string;
    showGoogleButton?: boolean;
    showForgotPassword?: boolean;
}