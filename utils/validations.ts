import * as yup from "yup";

export const signupValidationSchema = yup.object().shape({
  email: yup.string().required("Email address is required!").email("Please enter a valid email").label("Email"),
  password: yup
    .string()
    .required("Password is required!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, and a  Number ")
    .min(8)
    .label("Password"),
});

export const signinValidationSchema = yup.object().shape({
  email: yup.string().required("Email address is required!").email("Please enter a valid email").label("Email Address"),
  password: yup
    .string()
    .required("Password is required!")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, and a Number ")
    .min(8)
    .label("Password"),
});

export const profileSetupValidationSchema = yup.object().shape({
  name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required!").label("Name"),
  phoneNumber: yup
    .string()
    .required("Phone number is required!")
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, "Please enter a valid phone number")
    .label("Phone Number"),
  genderIdentity: yup.string().required("Gender identity is required!").label("Gender Identity"),
  roles: yup.string().required("Roles are required!").label("Roles"),
});
