import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password least ( 6 ) characters"),
});

export const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name least ( 3 - 10 ) letters")
    .max(10, "Name least ( 3 - 10 ) letters"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password least ( 6 ) characters"),
});
