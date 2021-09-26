import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const useTollSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    payment_type_id: Yup.number()
      .min(1)
      .required(t("validations.mandatoryField")),
    entry_ramp_long: Yup.number()
      .min(1)
      .required(t("validations.mandatoryButton")),
    entry_ramp_lat: Yup.number()
      .min(1)
      .required(t("validations.mandatoryButton")),
    exit_ramp_long: Yup.number()
      .min(1)
      .required(t("validations.mandatoryButton")),
    exit_ramp_lat: Yup.number()
      .min(1)
      .required(t("validations.mandatoryButton")),
    cost: Yup.number().min(1).required(t("validations.mandatoryField")),
  });
};
