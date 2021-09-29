import React from "react";
import { Formik } from "formik";
import { FuelPaymentType, useCosts } from "../../api/payment";
import { useFuelSchema } from "./Fuel.schema";
import FuelForm from "./FuelForm";
import { RootTabScreenProps } from "../../types";

const initialValues = {
  fuel_type_id: undefined,
  payment_type_id: undefined,
  gas_station_id: undefined,
  supplier: undefined,
  mileage: undefined,
  litres: undefined,
  cost: undefined,
  lat: undefined,
  long: undefined,
  image: undefined,
};

const Fuel = ({ navigation }: RootTabScreenProps<"Fuel">) => {
  const { mutate, status } = useCosts("1");

  const handleSubmit = (value: FuelPaymentType) => {
    mutate(value);

    if (status === "success" || status === "idle") {
      navigation.navigate("MainMenu");
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={useFuelSchema()}
    >
      <FuelForm />
    </Formik>
  );
};

export default Fuel;
