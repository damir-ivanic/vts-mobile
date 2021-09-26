import { Text, Heading, Button, Box } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, Dimensions } from "react-native";
import { useTruck } from "../../api/truck";
import Container from "../../components/container/Container";
import ErrorPage from "../../components/error/ErroPage";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { RootTabScreenProps } from "../../types";

export default function TruckDetails({
  navigation,
}: RootTabScreenProps<"TruckDetails">) {
  const { data, isLoading, isError, error } = useTruck();
  const { t } = useTranslation();

  const confirm = () => {
    navigation.navigate("TrailerDetails");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <Container>
      <Heading marginBottom={5}>{t("details.vehicleInfo")}</Heading>

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
            maxWidth: Dimensions.get("screen").width - 20,
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
          {t("details.currentMileage")}: {data?.mileage} km.
        </Text>
        <Text>
          {t("details.registrationExpiration")}: {data?.registration_expires}
        </Text>
        <Text>
          {t("details.nextService")}: {data?.service_date_next}
          {t("details.or")} {data?.service_mileage_next}
        </Text>
        <Text>
          {t("details.lastService")}: {data?.service_mileage} km.
        </Text>
      </Box>

      <Button
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
        onPress={confirm}
        mt={5}
      >
        {t("general.next")}
      </Button>
    </Container>
  );
}
