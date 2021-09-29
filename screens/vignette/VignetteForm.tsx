import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { usePaymentType, VignetteType } from "../../api/payment";
import { Button, CheckIcon, FormControl, Input, Select } from "native-base";
import { useTranslation } from "react-i18next";
import useGeoLocation from "../../hooks/useGeoLocation";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { Platform } from "react-native";
import { useContries } from "../../api/countries";
import ErrorPage from "../../components/error/ErroPage";

const VignetteForm = () => {
  const {
    values,
    errors,
    submitForm,
    handleBlur,
    setFieldValue,
    handleChange,
  } = useFormikContext<VignetteType>();
  const { lat, long, loading } = useGeoLocation();
  const {
    data: countries,
    isLoading: countriesLoading,
    isError: countriesError,
  } = useContries();
  const { data, isError, isLoading } = usePaymentType();
  const { t } = useTranslation();

  useEffect(() => {
    setFieldValue("lat", lat, false);
    setFieldValue("long", long, false);
  }, [lat, long]);

  if (isLoading || loading || countriesLoading) {
    return <LoadingScreen />;
  }

  if (isError || countriesError) {
    return <ErrorPage />;
  }

  return (
    <>
      <FormControl isInvalid={"payment_type_id" in errors}>
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
                true
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
      <FormControl isInvalid={"vignette_country_id" in errors} marginTop={5}>
        <FormControl.Label>{t("general.selectItem")}</FormControl.Label>
        {countries ? (
          <Select
            isDisabled={isError || isLoading}
            selectedValue={values.vignette_country_id?.toString()}
            accessibilityLabel={t("costs.selectCountry")}
            placeholder={t("costs.selectCountry")}
            onValueChange={(itemValue) => {
              setFieldValue(
                "vignette_country_id",
                Number.parseInt(itemValue),
                true
              );
            }}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
          >
            {countries?.map((country) => (
              <Select.Item
                key={country.id}
                label={country.name}
                value={country.id.toString()}
              />
            ))}
          </Select>
        ) : null}

        <FormControl.ErrorMessage>
          {errors.vignette_country_id}
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
          onBlur={handleBlur("days_of_validity")}
          placeholder={t("costs.amount")}
          onChangeText={handleChange("days_of_validity")}
          value={values.days_of_validity?.toString()}
        />
        <FormControl.ErrorMessage>
          {errors.days_of_validity}
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={"cost" in errors} marginTop={5}>
        <FormControl.Label>Iznos</FormControl.Label>
        <Input
          keyboardType={
            Platform.OS === "ios" ? "numbers-and-punctuation" : "number-pad"
          }
          placeholder={t("costs.amount")}
          onChangeText={handleChange("cost")}
          value={values.cost?.toString()}
        />
        <FormControl.ErrorMessage>{errors.cost}</FormControl.ErrorMessage>
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

export default VignetteForm;
