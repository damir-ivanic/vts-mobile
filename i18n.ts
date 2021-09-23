import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./translations/en.json";
import serbian from "./translations/ser.json";

const resources = {
  en: {
    translation: english,
  },
  serb: {
    translation: serbian,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "serb",
  fallbackLng: "en",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
