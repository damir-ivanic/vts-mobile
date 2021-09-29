import React, { useState } from "react";
import { useFormikContext } from "formik";
import { TollType, usePaymentType } from "../../api/payment";
import * as Location from "expo-location";
import { Button, CheckIcon, FormControl, Input, Select } from "native-base";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

type RampType = "entry_ramp" | "exit_ramp";

const TollForm = () => {
  const { values, errors, submitForm, setFieldValue, handleChange } =
    useFormikContext<TollType>();
  const [loadingLocation, setLoadingLocation] = useState(false);

  const { data, isError, isLoading } = usePaymentType();
  const { t } = useTranslation();

  const addLocation = async (rampType: RampType) => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    setLoadingLocation(true);

    try {
      const location = await Location.getCurrentPositionAsync({});
      setFieldValue(`${rampType}_lat`, location.coords.latitude, false);
      setFieldValue(`${rampType}_long`, location.coords.longitude, false);
      setFieldValue(`lat`, location.coords.latitude, false);
      setFieldValue(`long`, location.coords.longitude, false);
      setLoadingLocation(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <FormControl
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

      {values.entry_ramp_lat ? (
        <Button
          width="100%"
          marginTop={2}
          colorScheme="vtsGreen"
          _text={{ color: "white" }}
          disabled
        >
          {t("costs.successfullyAddedCoordinates")}
        </Button>
      ) : (
        <FormControl
          isRequired
          isInvalid={"entry_ramp_lat" in errors}
          marginTop={5}
        >
          <FormControl.Label>{t("costs.entryRamp")}</FormControl.Label>
          <Button
            width="100%"
            marginTop={2}
            onPress={() => addLocation("entry_ramp")}
            isLoading={loadingLocation}
            colorScheme="vtsBlue"
            _text={{ color: "white" }}
          >
            {t("general.addLocation")}
          </Button>
          <FormControl.ErrorMessage>
            {errors.entry_ramp_lat}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
      {values.exit_ramp_lat ? (
        <Button
          width="100%"
          marginTop={2}
          colorScheme="vtsGreen"
          _text={{ color: "white" }}
          disabled
        >
          {t("costs.successfullyAddedCoordinates")}
        </Button>
      ) : (
        <FormControl
          isRequired
          isInvalid={"exit_ramp_lat" in errors}
          marginTop={5}
        >
          <FormControl.Label>{t("costs.exitRamp")}</FormControl.Label>
          <Button
            width="100%"
            marginTop={2}
            onPress={() => addLocation("exit_ramp")}
            isLoading={loadingLocation}
            colorScheme="vtsBlue"
            _text={{ color: "white" }}
          >
            {t("general.addLocation")}
          </Button>
          <FormControl.ErrorMessage>
            {errors.exit_ramp_lat}
          </FormControl.ErrorMessage>
        </FormControl>
      )}
      <FormControl isRequired isInvalid={"cost" in errors} marginTop={5}>
        <FormControl.Label>Iznos</FormControl.Label>
        <Input
          isDisabled={loadingLocation}
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
        marginTop={5}
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

export default TollForm;
