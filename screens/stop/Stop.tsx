import { Formik } from "formik";
import React, { useEffect } from "react";
import { Stop as StopDto, useStop } from "../../api/stop";
import Container from "../../components/container/Container";
import { RootTabScreenProps } from "../../types";
import { useStopSchema } from "./Stop.schema";
import StopForm from "./StopForm";

const Stop = ({ navigation, route }: RootTabScreenProps<"Stop">) => {
  const { id } = route.params;
  const { mutate, isSuccess } = useStop();

  const initialValues: StopDto = {
    warrant_id: id,
    stop_reason_id: undefined,
    start: undefined,
    end: undefined,
    lat: undefined,
    long: undefined,
  };

  const handleSubmit = (value: StopDto) => {
    mutate(value);
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate("MainMenu", { id: id });
    }
  }, [isSuccess]);

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={useStopSchema()}
      >
        <StopForm />
      </Formik>
    </Container>
  );
};

export default Stop;
