import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup.string().min(2).required(),
  lastName: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(14).required(),
  rePassword: yup
    .string()
    .min(6)
    .max(14)
    .oneOf([yup.ref("password"), null])
    .required(),
  phoneNumber: yup
    .string()
    .matches(new RegExp("[0-9]{10}"))
    .min(10)
    .max(16)
    .required(),
});

export const updateUserSchema = yup.object().shape({
  firstName: yup.string().min(2).required(),
  lastName: yup.string().min(2).required(),
  email: yup.string().email(),
  password: yup.string().min(6).max(14),
  rePassword: yup
    .string()
    .min(6)
    .max(14)
    .oneOf([yup.ref("password"), null]),
  phoneNumber: yup.string().matches(new RegExp("[0-9]{10}")).min(10).max(16).required(),
  bio: yup.string(),
});
