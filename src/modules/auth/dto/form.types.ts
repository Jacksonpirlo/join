import { inputFieldProps } from './inputProps.type';

export interface formProps {
    titleOfTheForm: string;
    onClick?: ()=> void;
    fields: inputFieldProps[];
    className: string;
    btnText: string;
    googleBtnText: string
}