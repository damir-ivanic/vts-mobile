import { useFormikContext } from "formik";
import { Button, Image, Input } from "native-base";
import { FormControl } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/viatrucker-logo.jpg";

const LoginScreenForm = () => {
  const { t } = useTranslation();

  const { values, setFieldValue, errors, submitForm, handleBlur } =
    useFormikContext<LoginType>();

  const handleRegistrationNumber = (value: string) => {
    setFieldValue("registration_number", value, false);
  };

  const handlePassword = (value: string) => {
    setFieldValue("password", value, false);
  };
  return (
    <>
      <Image height={150} alt="via-trucker logo" source={logo} />
      <FormControl isRequired marginTop={5}>
        <Input
          onBlur={handleBlur("registration_number")}
          placeholder={t("login.plates")}
          onChangeText={handleRegistrationNumber}
          value={values.registration_number?.toString()}
        />
        <FormControl.ErrorMessage>
          {errors.registration_number}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired marginTop={5}>
        <Input
          type="password"
          onBlur={handleBlur("password")}
          placeholder={t("login.password")}
          onChangeText={handlePassword}
          value={values.password?.toString()}
        />
        <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>
      </FormControl>
      <Button
        width="100%"
        marginTop={2}
        onPress={submitForm}
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
      >
        {t("general.save")}
      </Button>
    </>
  );
};

export default LoginScreenForm;
