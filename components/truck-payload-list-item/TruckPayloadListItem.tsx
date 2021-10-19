import { FontAwesome5 } from "@expo/vector-icons";
import { Link, Box, Text } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { Cargo } from "../../api/cargo-handling";

type Props = {
  cargo: Cargo;
};

const TruckPayloadListItem = ({ cargo }: Props) => {
  const { t } = useTranslation();
  const handleNavigate = () => {};
  return (
    <Link onPress={handleNavigate}>
      <Box
        width="96%"
        flexDirection="row"
        alignItems="center"
        marginX="2%"
        marginTop={2}
        padding={2}
        rounded="lg"
        overflow="hidden"
        borderColor="gray"
        borderWidth={1}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <FontAwesome5 name="flag" size={25} color="black" />
        <Text marginLeft={2}>
          {t("general.street")}:{cargo.address}
        </Text>
      </Box>
    </Link>
  );
};

export default TruckPayloadListItem;
