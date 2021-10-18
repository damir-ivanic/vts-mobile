import { format } from "date-fns";
import { Formik } from "formik";
import { Container } from "native-base";
import React, { useEffect } from "react";
import { StartType, useStart } from "../../api/start";
import { RootTabScreenProps } from "../../types";
import { startSchema } from "./Start.schema";
import StartForm from "./StartForm";

const initialValues = {
  mileage_start: "",
  warrant_start_time: format(new Date(), "yyyy-MM-dd hh:mm"),
};

const Start = ({ navigation, route }: RootTabScreenProps<"Start">) => {
  const { mutate, isSuccess } = useStart();
  const { id } = route.params;

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate("MainMenu", { id: id });
    }
  }, [isSuccess]);

  const handleSubmit = (values: StartType) => {
    mutate(values);
  };
  return (
    <Container p={2} minWidth="100%">
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ warrant_id: id, ...initialValues }}
        validationSchema={startSchema}
      >
        <StartForm />
      </Formik>
    </Container>
  );
};

export default Start;
