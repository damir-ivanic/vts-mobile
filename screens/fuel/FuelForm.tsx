import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import {
  Input,
  Button,
  FormControl,
  Select,
  CheckIcon,
  View,
  Text,
  Icon,
  KeyboardAvoidingView,
  VStack,
  ScrollView,
} from "native-base";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useCameraState } from "../../state-providers/CameraStateProvider";

import { useFuelType } from "../../api/fuel";
import { FuelPaymentType, usePaymentType } from "../../api/payment";
import { useSuppliers } from "../../api/supplierts";
import useGeoLocation from "../../hooks/useGeoLocation";
import LoadingScreen from "../../components/loading/LoadingScreen";
import ErrorPage from "../../components/error/ErroPage";
import { useGasStations } from "../../api/gas-stations";

const FuelForm = () => {
  const { values, errors, submitForm, handleChange, setFieldValue } =
    useFormikContext<FuelPaymentType>();
  const { data, isError, isLoading } = usePaymentType();
  const { data: fuelType, isError: isFuelError } = useFuelType();
  const { loading, lat, long } = useGeoLocation();
  const { data: suppliers, isError: isSuppliersError } = useSuppliers();
  const { data: stations, isError: isStationsError } = useGasStations();
  const { capturedData, openCamera } = useCameraState();
  const { t } = useTranslation();

  useEffect(() => {
    if (capturedData?.base64) {
      setFieldValue("image", capturedData.base64);
    }
  }, [capturedData]);

  useEffect(() => {
    setFieldValue("lat", lat, false);
    setFieldValue("long", long, false);
  }, [lat, long]);

  if (isLoading || loading) {
    return <LoadingScreen />;
  }

  if (isError || isSuppliersError || isStationsError || isFuelError) {
    return <ErrorPage />;
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={130}
      h={{
        base: "100%",
        lg: "auto",
      }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView flex={1}>
          <VStack p="5" justifyContent="flex-end" space={4}>
            <FormControl isRequired isInvalid={"payment_type_id" in errors}>
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
              {errors.fuel_type_id ? (
                <FormControl.ErrorMessage>
                  {errors.fuel_type_id}.
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isRequired isInvalid={"fuel_type_id" in errors}>
              <FormControl.Label>{t("general.selectItem")}</FormControl.Label>
              {fuelType ? (
                <Select
                  isDisabled={isError || isLoading}
                  selectedValue={values.fuel_type_id?.toString()}
                  accessibilityLabel={t("costs.fuelType")}
                  placeholder={t("costs.fuelType")}
                  onValueChange={(itemValue) => {
                    setFieldValue(
                      "fuel_type_id",
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
                  {fuelType?.map((paymentType: any) => (
                    <Select.Item
                      key={paymentType.id}
                      label={paymentType.fuel_type}
                      value={paymentType.id.toString()}
                    />
                  ))}
                </Select>
              ) : null}
              {errors.fuel_type_id ? (
                <FormControl.ErrorMessage>
                  {errors.fuel_type_id}.
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            <FormControl isRequired isInvalid={"gas_station_id" in errors}>
              <FormControl.Label>{t("general.selectItem")}</FormControl.Label>
              {stations ? (
                <Select
                  isDisabled={isError || isLoading}
                  selectedValue={values.gas_station_id?.toString()}
                  accessibilityLabel={t("costs.fuelStation")}
                  placeholder={t("costs.fuelStation")}
                  onValueChange={(itemValue) => {
                    setFieldValue(
                      "gas_station_id",
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
                  {stations?.map((station) => (
                    <Select.Item
                      key={station.id}
                      label={station.name}
                      value={station.id.toString()}
                    />
                  ))}
                </Select>
              ) : null}
              {errors.gas_station_id ? (
                <FormControl.ErrorMessage>
                  {errors.gas_station_id}.
                </FormControl.ErrorMessage>
              ) : null}
            </FormControl>
            {suppliers && values.payment_type_id === 2 ? (
              <FormControl isRequired isInvalid={"supplier" in errors}>
                <FormControl.Label>{t("general.selectItem")}</FormControl.Label>
                <Select
                  selectedValue={values.supplier?.toString()}
                  accessibilityLabel={t("costs.suppliers")}
                  placeholder={t("costs.suppliers")}
                  onValueChange={(itemValue) => {
                    setFieldValue(
                      "supplier",
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
                  {suppliers?.map((station) => (
                    <Select.Item
                      key={station.id}
                      label={station.name}
                      value={station.id.toString()}
                    />
                  ))}
                </Select>

                {errors.supplier ? (
                  <FormControl.ErrorMessage>
                    {errors.supplier}.
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            ) : null}

            <FormControl isRequired isInvalid={"mileage" in errors}>
              <FormControl.Label>{t("general.mileage")}</FormControl.Label>
              <Input
                keyboardType="number-pad"
                placeholder={t("general.mileage")}
                onChangeText={handleChange("mileage")}
                value={values.mileage?.toString()}
              />
              <FormControl.ErrorMessage>
                {errors.mileage}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"litres" in errors}>
              <FormControl.Label>{t("costs.amount")}</FormControl.Label>
              <Input
                keyboardType="number-pad"
                placeholder={t("costs.amount")}
                onChangeText={handleChange("litres")}
                value={values.litres?.toString()}
              />
              <FormControl.ErrorMessage>
                {errors.litres}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"cost" in errors}>
              <FormControl.Label>{t("costs.price")}</FormControl.Label>
              <Input
                keyboardType={
                  Platform.OS === "ios"
                    ? "numbers-and-punctuation"
                    : "number-pad"
                }
                placeholder={t("costs.price")}
                onChangeText={handleChange("cost")}
                value={values.cost?.toString()}
              />
              <FormControl.ErrorMessage>{errors.cost}</FormControl.ErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={"image" in errors}>
              <Button
                mt={2}
                size="sm"
                onPress={openCamera}
                colorScheme="vtsBlue"
                _text={{ color: "white" }}
              >
                <View flexDirection="row" alignItems="center">
                  <Text color="white" mr={2}>
                    {t(
                      `general.${
                        values.image ? "retakePicture" : "takePicture"
                      }`
                    )}
                  </Text>
                  <Icon
                    color="white"
                    as={
                      <MaterialCommunityIcons
                        name={values.image ? "camera-retake" : "camera"}
                      />
                    }
                  />
                </View>
              </Button>
              <FormControl.ErrorMessage>{errors.cost}</FormControl.ErrorMessage>
            </FormControl>

            <Button
              width="100%"
              marginTop={2}
              colorScheme="vtsBlue"
              _text={{ color: "white" }}
              onPress={submitForm}
            >
              {t("general.save")}
            </Button>
          </VStack>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FuelForm;
