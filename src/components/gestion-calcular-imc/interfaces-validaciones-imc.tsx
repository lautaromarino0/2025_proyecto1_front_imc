import * as yup from "yup";

//===================== interfaces para las cosas que se van a ingresar en el formulario y es necesario validarlas ==========//

export interface FormValuesImc {
  altura: number;
  peso: number;
}



export const schemaImc = yup.object().shape({
  altura: yup
    .number()
    .typeError("La altura debe ser un número.")
    .required("La altura es obligatoria.")
    .positive("La altura debe ser un número positivo mayor a 0 metros.")
    .max(3, "La altura máxima registrada es de 3 metros."),
  peso: yup
    .number()
    .typeError("El peso debe ser un número.")
    .required("El peso es obligatorio.")
    .positive("El peso debe ser un número positivo mayor a 0 kg.")
    .max(500, "El peso máximo registrado es de 500 kg."),

});



