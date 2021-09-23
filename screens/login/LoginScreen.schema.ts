import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  registration_number: Yup.string().required(),
  password: Yup.string().required(),
});
