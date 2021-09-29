import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const useVignetteSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    payment_type_id: Yup.number().required(t("validations.mandatoryField")),
    country_id: Yup.number().required(t("validations.mandatoryField")),
    lat: Yup.number().required(t("validations.mandatoryButton")),
    long: Yup.number().required(t("validations.mandatoryButton")),
    cost: Yup.number().required(t("validations.mandatoryField")),
    days_of_validity: Yup.number().required(t("validations.mandatoryField")),
  });
};
