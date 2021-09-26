import * as React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import Container from "../container/Container";

export default function ErrorPage() {
  const { t } = useTranslation();
  return (
    <Container>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text>{t("errorPage.explanation")}</Text>
      </View>
    </Container>
  );
}
