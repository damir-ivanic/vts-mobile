import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Box, Text, View } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { Customs } from "../../api/customs";

type Props = {
  customs: Customs;
  navigation: any;
};

const CustomsItem = ({ customs, navigation }: Props) => {
  const { t } = useTranslation();
  const handleNavigate = () => {
    navigation.push("CustomsView", {
      customs: customs,
    });
  };

  return (
    <Link onPress={handleNavigate}>
      <Box
        width="96%"
        flexDirection="column"
        justifyContent="center"
        marginX="2%"
        marginTop={2}
        padding={2}
        rounded="lg"
        overflow="hidden"
        borderColor={customs.end_time ? "#16a06e" : "gray"}
        borderWidth={1}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <View display="flex" flexDirection="row" marginBottom={2}>
          <FontAwesome5 name="flag" size={25} color="black" />
          <Text marginLeft={2}>
            {t("general.street")}: {customs.address}
          </Text>
        </View>
        <View display="flex" flexDirection="row">
          <MaterialCommunityIcons name="sign-caution" size={25} color="black" />
          <Text marginLeft={2}>
            {t("general.terminal")}: {customs.customs_terminal}
          </Text>
        </View>
        {customs.end_time && (
          <View display="flex" flexDirection="row">
            <FontAwesome5 name="check" size={25} color="#16a06e" />
          </View>
        )}
      </Box>
    </Link>
  );
};

export default CustomsItem;
