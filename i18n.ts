import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./translations/en.json";
import serbian from "./translations/rs.json";

const resources = {
  en: {
    translation: english,
  },
  rs: {
    translation: serbian,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "rs",
  fallbackLng: "en",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
