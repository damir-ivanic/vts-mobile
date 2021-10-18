import { useTranslation } from "react-i18next";
import * as Yup from "yup";

export const useStopSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    warrant_id: Yup.number().min(1).required(t("validations.mandatoryField")),
    stop_reason_id: Yup.number()
      .min(1)
      .required(t("validations.mandatoryButton")),
    start: Yup.string().min(1).required(t("validations.mandatoryButton")),
    end: Yup.string().min(1).required(t("validations.mandatoryButton")),
    lat: Yup.number().min(1).required(t("validations.mandatoryButton")),
    long: Yup.number().min(1).required(t("validations.mandatoryField")),
  });
};
