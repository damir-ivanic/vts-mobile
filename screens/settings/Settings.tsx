import { Button } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../../components/container/Container";
import { useAuthentication } from "../../hooks/useAuthentication";

const Settings = () => {
  const { t } = useTranslation();
  const { logOut } = useAuthentication();

  return (
    <Container>
      <Button
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
        onPress={logOut}
        mt={5}
      >
        {t("general.logOut")}
      </Button>
    </Container>
  );
};

export default Settings;
