import { Formik } from "formik";
import React from "react";
import { TollType, useCosts } from "../../api/payment";
import Container from "../../components/container/Container";
import { RootTabScreenProps } from "../../types";
import { useTollSchema } from "./Toll.schema";
import TollForm from "./TollForm";

const initialValues = {
  payment_type_id: undefined,
  entry_ramp_long: undefined,
  entry_ramp_lat: undefined,
  exit_ramp_long: undefined,
  exit_ramp_lat: undefined,
  cost: undefined,
  long: undefined,
  lat: undefined,
};

const Toll = ({ navigation, route }: RootTabScreenProps<"Toll">) => {
  const { mutate } = useCosts("2");
  const { id } = route.params;

  const handleSubmit = (value: TollType) => {
    mutate(value);
    navigation.navigate("MainMenu", { id: id });
  };
  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={useTollSchema()}
      >
        <TollForm />
      </Formik>
    </Container>
  );
};

export default Toll;
