import { Box, Button, Heading, Text } from "native-base";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image } from "react-native";
import { useTrailer } from "../../api/truck";
import Container from "../../components/container/Container";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { RootTabScreenProps } from "../../types";

export default function TrailerDetails({
  navigation,
}: RootTabScreenProps<"TrailerDetails">) {
  const { data, isLoading } = useTrailer();
  const { t } = useTranslation();

  const confirm = () => {
    navigation.navigate("Inspection");
  };

  if (isLoading) {
    return <LoadingScreen />;
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
