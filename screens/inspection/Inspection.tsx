import React from "react";
import { Formik, FormikHelpers } from "formik";

import InspectionForm from "./InspectionForm";
import { initialValues } from "./Inspection.constants";
import { inspectionSchema } from "./Inspection.form-validation";
import { request } from "../../api/api";
import { InspectionFormValues } from "./Inspection.types";
import { RootTabScreenProps } from "../../types";
import Container from "../../components/container/Container";

const Inspection = ({ navigation }: RootTabScreenProps<"Inspection">) => {
  const handleSubmit = async (
    values: InspectionFormValues,
    { setSubmitting }: FormikHelpers<InspectionFormValues>
  ) => {
    try {
      const { status } = await request.post("/inspection", values);
      if (status === 200) {
        navigation.navigate("Start");
      }
    } catch (error) {
      setSubmitting(false);
      // @TODO: Handle error
    }
  };

  return (
    <Container>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={inspectionSchema}
      >
        <InspectionForm />
      </Formik>
    </Container>
  );
};

export default Inspection;
