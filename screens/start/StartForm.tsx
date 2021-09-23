import { useFormikContext } from "formik";
import { View, ScrollView, FormControl, Input, Button } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { StartType } from "../../api/start";

const StartForm = () => {
  const { values, errors, submitForm, handleBlur, handleChange, isValid } =
    useFormikContext<StartType>();
  const { t } = useTranslation();
  console.log(isValid, errors);

  return (
    <View width="100%">
      <FormControl>
        <FormControl.Label>{t("forms.currentDate")}</FormControl.Label>
        <Input isDisabled value={values.warrant_start_time} />
      </FormControl>
      <ScrollView height="92%">
        <FormControl
          isRequired
          isInvalid={"mileage_start" in errors}
          marginTop={5}
        >
          <FormControl.Label>{t("details.currentMileage")}</FormControl.Label>
          <Input
            keyboardType="number-pad"
            onBlur={handleBlur("mileage_start")}
            placeholder={t("costs.amount")}
            onChangeText={handleChange("mileage_start")}
            value={values.mileage_start}
          />
          <FormControl.ErrorMessage>
            {errors.mileage_start}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button
          width="100%"
          marginTop={2}
          onPress={submitForm}
          disabled={!isValid}
          colorScheme="vtsBlue"
          _text={{ color: "white" }}
        >
          {t("general.save")}
        </Button>
      </ScrollView>
    </View>
  );
};

export default StartForm;
