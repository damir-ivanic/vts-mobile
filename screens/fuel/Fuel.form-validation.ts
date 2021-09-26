import * as Yup from "yup";

export const fuelSchema = Yup.object().shape({
  fuel_type_id: Yup.number().required(),
  payment_type_id: Yup.number().required(),
  supplier: Yup.number().required(),
  mileage: Yup.number().required(),
  litres: Yup.number().required(),
  cost: Yup.number().required(),
  lat: Yup.number().required(),
  long: Yup.number().required(),
  image: Yup.string().required(),
});
