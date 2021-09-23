import React, { useRef, useState } from "react";
import { useFormikContext } from "formik";
import { useFuelType } from "../../api/fuel";
import { FuelPaymentType, usePaymentType } from "../../api/payment";
import {
  Input,
  Button,
  FormControl,
  Select,
  CheckIcon,
  View,
  Text,
  ScrollView,
  Icon,
} from "native-base";
import { Image } from "react-native";
import { Camera as CameraBase, CameraPictureOptions } from "expo-camera";
import Camera from "../../components/camera";
import useToggle from "../../hooks/useToggle";
import { useTranslation } from "react-i18next";
import { Entypo } from "@expo/vector-icons";
import * as Location from "expo-location";
import { SupplierType, useSuppliers } from "../../api/supplierts";

const FuelForm = () => {
  const {
    values,
    errors,
    submitForm,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext<FuelPaymentType>();
  const { data, isError, isLoading } = usePaymentType();
  const {
    data: fuelType,
    isError: isFuelTypeError,
    isLoading: isFuelTypeLoading,
  } = useFuelType();

  const { data: suppliers } = useSuppliers();

  const [loadingLocation, setLoadingLocation] = useState(false);
  const cameraRef = useRef<CameraBase | null>(null);
  const [isCameraOpen, toggleCamera] = useToggle();
  const { t } = useTranslation();

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const options: CameraPictureOptions = { quality: 0.7, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);
        setFieldValue("image", data.base64, true);
        toggleCamera();
      } catch (error) {
        // @TODO: Handle error
      }
    }
  };

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
    <ScrollView>
      <FormControl isRequired isInvalid={"payment_type_id" in errors}>
        <FormControl.Label>Select Item</FormControl.Label>
        {data ? (
          <Select
            isDisabled={isError || isLoading}
            selectedValue={values.payment_type_id?.toString()}
            accessibilityLabel="Nacin placanja"
            placeholder="Nacin placanja"
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
      {/* <FormControl isRequired isInvalid={"fuel_type_id" in errors}>
        <FormControl.Label>Select Item</FormControl.Label>
        {fuelType ? (
          <Select
            isDisabled={isFuelTypeError || isFuelTypeLoading}
            selectedValue={values.fuel_type_id?.toString()}
            accessibilityLabel="Tip goriva"
            placeholder="Tip goriva"
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
      </FormControl> */}
      <FormControl isRequired isInvalid={"supplier" in errors} marginTop={5}>
        <FormControl.Label>Select Item</FormControl.Label>
        {suppliers ? (
          <Select
            isDisabled={isFuelTypeError || isFuelTypeLoading}
            selectedValue={values.supplier?.toString()}
            accessibilityLabel="Supplieri"
            placeholder="Supplieri"
            onValueChange={(itemValue) => {
              setFieldValue("suppliers", Number.parseInt(itemValue), false);
            }}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
            }}
            mt={1}
          >
            {suppliers?.map((paymentType: SupplierType) => (
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
      <FormControl isRequired isInvalid={"mileage" in errors} marginTop={5}>
        <FormControl.Label>Kilometraza</FormControl.Label>
        <Input
          keyboardType="number-pad"
          onBlur={handleBlur("mileage")}
          placeholder="Mileage"
          onChangeText={handleChange("mileage")}
          value={values.mileage?.toString()}
        />
        <FormControl.ErrorMessage>{errors.mileage}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={"litres" in errors} marginTop={5}>
        <FormControl.Label>Kolicina</FormControl.Label>
        <Input
          keyboardType="number-pad"
          onBlur={handleBlur("litres")}
          placeholder="Kolicina"
          onChangeText={handleChange("litres")}
          value={values.litres?.toString()}
        />
        <FormControl.ErrorMessage>{errors.litres}</FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={"cost" in errors} marginTop={5}>
        <FormControl.Label>Iznos</FormControl.Label>
        <Input
          keyboardType="number-pad"
          onBlur={handleBlur("cost")}
          placeholder="Iznos"
          onChangeText={handleChange("cost")}
          value={values.cost?.toString()}
        />
        <FormControl.ErrorMessage>{errors.cost}</FormControl.ErrorMessage>
        <Button
          mt={2}
          size="sm"
          onPress={toggleCamera}
          colorScheme="vtsBlue"
          _text={{ color: "white" }}
        >
          <View flexDirection="row" alignItems="center">
            <Text color="white" mr={2}>
              {t(`general.${values.image ? "retakePicture" : "takePicture"}`)}
            </Text>
            <Icon color="white" as={<Entypo name="camera" />} />
          </View>
        </Button>
      </FormControl>
      {values.image ? (
        <>
          <Image
            source={{
              uri: `data:image/jpg;base64,${values.image}`,
            }}
            style={{ height: "100%", width: "auto", marginTop: 2 }}
          />
        </>
      ) : null}

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
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
        onPress={submitForm}
      >
        {t("general.save")}
      </Button>
      {isCameraOpen && (
        <Camera ref={cameraRef} onTakePicture={handleTakePicture} />
      )}
    </ScrollView>
  );
};

export default FuelForm;
