import * as yup from "yup";


export interface DecodedToken {
  sub: number;  //userId
  email: string;
}

export interface FormValuesRegister {
  email: string;
  password: string;
}

export interface FormValuesLogin {
  email: string;
  password: string;
}


export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("El correo electrónico es obligatorio.")
    .max(255, "Máximo 255 caracteres.")
    .matches(/^[A-Za-z0-9@._-]+$/, "Formato de correo inválido."),
  password: yup
    .string()
    .trim()
    .required("El correo electrónico es obligatorio.")
    .max(255, "Máximo 255 caracteres.")
    .matches(/^[A-Za-z0-9@._-]+$/, "Formato de correo inválido."),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required("El correo electrónico es obligatorio.")
    .max(255, "Máximo 255 caracteres.")
    .matches(/^[A-Za-z0-9@._-]+$/, "Formato de correo inválido."),
  password: yup
    .string()
    .trim()
    .required("El correo electrónico es obligatorio.")
    .max(255, "Máximo 255 caracteres.")
    .matches(/^[A-Za-z0-9@._-]+$/, "Formato de correo inválido."),
});
