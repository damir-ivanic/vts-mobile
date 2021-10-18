import * as Yup from "yup";

export const startSchema = Yup.object().shape({
  warrant_id: Yup.number().min(1).required(),
  mileage_start: Yup.number().min(1).required(),
  warrant_start_time: Yup.string().required(),
});
