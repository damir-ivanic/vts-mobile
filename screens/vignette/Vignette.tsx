import { Formik } from "formik";
import React from "react";
import { useCosts, VignetteType } from "../../api/payment";
import Container from "../../components/container/Container";
import { RootTabScreenProps } from "../../types";
import { useVignetteSchema } from "./Vignette.form-validation";
import VignetteForm from "./VignetteForm";

const initialValues = {
  payment_type_id: undefined,
  lat: undefined,
  long: undefined,
  cost: undefined,
  days_of_validity: undefined,
  vignette_country_id: undefined,
};

const Vignette = ({ navigation, route }: RootTabScreenProps<"Vignette">) => {
  const { mutate } = useCosts("12");
  const { id } = route.params;

  const handleSubmit = (value: VignetteType) => {
    mutate(value);
    navigation.navigate("MainMenu", { id: id });
  };

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={useVignetteSchema()}
      >
        <VignetteForm />
      </Formik>
    </Container>
  );
};

export default Vignette;
