import React from "react";
import { Formik } from "formik";
import { RootTabScreenProps } from "../../types";
import { loginSchema } from "./LoginScreen.schema";
import { useLogin } from "../../api/authentication";
import LoadingScreen from "../../components/loading/LoadingScreen";
import LoginScreenForm from "./LoginScreenForm";
import Container from "../../components/container/Container";

const initialValues = {
  registration_number: "",
  password: "",
};

const LoginScreen = ({ navigation }: RootTabScreenProps<"LoginScreen">) => {
  const { mutate, isLoading } = useLogin(navigation);

  const handleSubmit = (values: LoginType) => {
    mutate(values);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        <LoginScreenForm />
      </Formik>
    </Container>
  );
};

export default LoginScreen;
