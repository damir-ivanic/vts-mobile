import React, { useState } from "react";
import { useFormikContext } from "formik";
import { usePaymentType, VignetteType } from "../../api/payment";
import * as Location from "expo-location";
import { Button, CheckIcon, FormControl, Input, Select } from "native-base";
import { useTranslation } from "react-i18next";

const VignetteForm = () => {
  const { values, errors, submitForm, handleBlur, setFieldValue } =
    useFormikContext<VignetteType>();
  const [loadingLocation, setLoadingLocation] = useState(false);

  const { data, isError, isLoading } = usePaymentType();
  const { t } = useTranslation();

  const addLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    setLoadingLocation(true);

    const location = await Location.getCurrentPositionAsync({});
    setFieldValue("lat", location.coords.latitude, false);
    setFieldValue("long", location.coords.longitude, false);
    setLoadingLocation(false);
  };

  const handleValidityChange = (value: string) => {
    setFieldValue("days_of_validity", Number.parseInt(value), false);
  };

  const handleCostChange = (value: string) => {
    setFieldValue("cost", Number.parseInt(value), false);
  };

  return (
    <>
      <FormControl
        isRequired
        isDisabled={loadingLocation}
        isInvalid={"payment_type_id" in errors}
      >
        <FormControl.Label>{t("general.selectItem")}</FormControl.Label>
        {data ? (
          <Select
            isDisabled={isError || isLoading}
            selectedValue={values.payment_type_id?.toString()}
            accessibilityLabel={t("costs.paymentMethod")}
            placeholder={t("costs.paymentMethod")}
            onValueChange={(itemValue) => {
              setFieldValue(
                "payment_type_id",
                Number.parseInt(itemValue),
                false
              );
            }}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
          >
            {data?.map((paymentType: any) => (
              <Select.Item
                key={paymentType.id}
                label={paymentType.name}
                value={paymentType.id.toString()}
              />
            ))}
          </Select>
        ) : null}

        <FormControl.ErrorMessage>
          {errors.payment_type_id}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl
        isRequired
        isInvalid={"days_of_validity" in errors}
        marginTop={5}
      >
        <FormControl.Label>{t("forms.numberOfValidityDays")}</FormControl.Label>
        <Input
          keyboardType="number-pad"
          isDisabled={loadingLocation}
          onBlur={handleBlur("days_of_validity")}
          placeholder={t("costs.amount")}
          onChangeText={handleValidityChange}
          value={values.days_of_validity?.toString()}
        />
        <FormControl.ErrorMessage>
          {errors.days_of_validity}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={"cost" in errors} marginTop={5}>
        <FormControl.Label>Iznos</FormControl.Label>
        <Input
          isDisabled={loadingLocation}
          keyboardType="number-pad"
          onBlur={handleBlur("cost")}
          placeholder={t("costs.amount")}
          onChangeText={handleCostChange}
          value={values.cost?.toString()}
        />
        <FormControl.ErrorMessage>{errors.cost}</FormControl.ErrorMessage>
      </FormControl>
      {values.lat ? (
        <Button
          width="100%"
          marginTop={2}
          colorScheme="vtsGreen"
          _text={{ color: "white" }}
          disabled
        >
          Lokacija uspesno dodata
        </Button>
      ) : (
        <FormControl isRequired isInvalid={"lat" in errors} marginTop={5}>
          <Button
            width="100%"
            marginTop={2}
            onPress={addLocation}
            isLoading={loadingLocation}
            colorScheme="vtsBlue"
            _text={{ color: "white" }}
          >
            {t("general.addLocation")}
          </Button>
          <FormControl.ErrorMessage>{errors.lat}</FormControl.ErrorMessage>
        </FormControl>
      )}
      <Button
        width="100%"
        marginTop={2}
        onPress={submitForm}
        disabled={loadingLocation}
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
      >
        {t("general.save")}
      </Button>
    </>
  );
};

export default VignetteForm;
