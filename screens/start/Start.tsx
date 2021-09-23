import { format } from "date-fns";
import { Formik } from "formik";
import { Container } from "native-base";
import React from "react";
import { StartType, useStart } from "../../api/start";
import { RootTabScreenProps } from "../../types";
import { startSchema } from "./Start.schema";
import StartForm from "./StartForm";

const initialValues = {
  mileage_start: "",
  warrant_start_time: format(new Date(), "yyyy-MM-dd hh:mm"),
};

const Start = ({ navigation }: RootTabScreenProps<"Start">) => {
  const { mutate } = useStart(navigation);

  const handleSubmit = (values: StartType) => {
    mutate(values);
  };
  return (
    <Container p={2} minWidth="100%">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={startSchema}
      >
        <StartForm />
      </Formik>
    </Container>
  );
};

export default Start;
