import React from "react";
import { Formik } from "formik";
import { FuelPaymentType, useCosts } from "../../api/payment";
import { fuelSchema } from "./Fuel.form-validation";
import FuelForm from "./FuelForm";
import { RootTabScreenProps } from "../../types";

const initialValues = {
  fuel_type_id: 2,
  payment_type_id: undefined,
  supplier: undefined,
  mileage: undefined,
  litres: undefined,
  cost: undefined,
  lat: undefined,
  long: undefined,
  image: undefined,
};

const Fuel = ({ navigation }: RootTabScreenProps<"Fuel">) => {
  const { mutate, isSuccess, error } = useCosts("1");

  console.log(error?.response);

  const handleSubmit = (value: FuelPaymentType) => {
    mutate(value);
    if (isSuccess) {
      navigation.navigate("MainMenu");
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={fuelSchema}
    >
      <FuelForm />
    </Formik>
  );
};

export default Fuel;
