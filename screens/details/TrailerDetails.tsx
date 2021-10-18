import { Box, Button, Heading, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { useTrailer } from "../../api/truck";
import Container from "../../components/container/Container";
import ErrorPage from "../../components/error/ErroPage";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { RootTabScreenProps } from "../../types";

type RouteProps = {
  id: number;
};

export default function TrailerDetails({
  route,
  navigation,
}: RootTabScreenProps<"TrailerDetails">) {
  const { t } = useTranslation();
  const { id } = route.params;
  const { data, isLoading, isError } = useTrailer(id);

  const confirm = () => {
    navigation.navigate("Inspection", {
      id: id,
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Heading marginBottom={5}>{t("details.trailerInfo")}</Heading>
      <Box>
        <Text>
          {t("details.plateNumber")}: {data?.registration_number}
        </Text>
        <Text>
          {t("details.model")}: {data?.model}
        </Text>
      </Box>
      {data?.image ? (
        <Image
          style={{
            width: "100%",
            height: 200,
            marginBottom: 5,
            marginTop: 5,
          }}
          source={{
            uri: data.image,
          }}
        />
      ) : null}

      <Box minWidth="100%">
        <Text>
          {t("details.registrationExpiration")}: {data?.registration_expires}
        </Text>
        <Text>
          {t("details.nextService")}: {data?.service_date_next}
        </Text>

        <Button
          colorScheme="vtsBlue"
          _text={{ color: "white" }}
          onPress={confirm}
          mt={5}
        >
          {t("general.next")}
        </Button>
      </Box>
    </Container>
  );
}
