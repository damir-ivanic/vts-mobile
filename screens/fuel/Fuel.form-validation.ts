import * as Yup from "yup";

export const fuelSchema = Yup.object().shape({
  fuel_type_id: Yup.number().required(),
  payment_type_id: Yup.number().required(),
  supplier: Yup.string().required(),
  mileage: Yup.number().required(),
  litres: Yup.number().required(),
  cost: Yup.number().required(),
  lat: Yup.string().required(),
  long: Yup.string().required(),
  image: Yup.string().required(),
});
