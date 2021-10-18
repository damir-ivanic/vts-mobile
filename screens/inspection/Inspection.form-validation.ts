import * as Yup from "yup";
import { number } from "yup/lib/locale";

// @TODO: Figure out better error naming

export const vehiclePartValidationSchema = (
  errorMessage = "Required."
): Yup.StringSchema =>
  Yup.string().when("valid", {
    is: false,
    then: Yup.string().required(errorMessage),
    otherwise: Yup.string(),
  });

const vehiclePartSchema = () =>
  Yup.object().shape({
    valid: Yup.boolean().nullable().equals([true, false], "Required."),
    remark_comment: vehiclePartValidationSchema(),
    remark_image: vehiclePartValidationSchema(),
  });

export const inspectionSchema = Yup.object().shape({
  warrant_id: Yup.object().shape({
    id: Yup.number().required(),
  }),
  tires: vehiclePartSchema(),
  electricity_lights: vehiclePartSchema(),
  mirrors: vehiclePartSchema(),
  vehicle_exterior: vehiclePartSchema(),
  vehicle_interior: vehiclePartSchema(),
  additional_equipment: vehiclePartSchema(),
  documentation: vehiclePartSchema(),
});
