import { Text, Heading, Box } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, Dimensions } from "react-native";
import { useTruck } from "../../api/truck";
import Container from "../../components/container/Container";
import ErrorPage from "../../components/error/ErroPage";
import LoadingScreen from "../../components/loading/LoadingScreen";

export default function TruckDetails() {
  const { data, isLoading, isError } = useTruck();
  const { t } = useTranslation();

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
    </Container>
  );
}
