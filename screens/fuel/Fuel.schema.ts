import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const supplierSchema = (errorMessage = "Required."): Yup.NumberSchema =>
  Yup.number().when("payment_type_id", {
    is: 2,
    then: Yup.number().required(errorMessage),
    otherwise: Yup.number(),
  });

export const useFuelSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    fuel_type_id: Yup.number().required(t("validations.mandatoryField")),
    payment_type_id: Yup.number().required(t("validations.mandatoryField")),
    supplier: supplierSchema(),
    mileage: Yup.number().required(t("validations.mandatoryField")),
    litres: Yup.number().required(t("validations.mandatoryField")),
    cost: Yup.number().required(t("validations.mandatoryField")),
    lat: Yup.number().required(t("validations.mandatoryField")),
    long: Yup.number().required(t("validations.mandatoryField")),
    image: Yup.string().required(t("validations.mandatoryField")),
    gas_station_id: Yup.number().required(t("validations.mandatoryField")),
  });
};
