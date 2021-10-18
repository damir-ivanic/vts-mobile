import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, Box, View, Link } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { Warrant } from "../../api/warrants";

type Props = {
  warrant: Warrant;
  navigation: any;
};

const WarrantItem = ({ warrant, navigation }: Props) => {
  const active = Boolean(warrant.warrant_start_time);
  const { t } = useTranslation();

  console.log(warrant);

  const onPress = async () => {
    if (active) {
      navigation.push("MainMenu", {
        id: warrant.id,
      });
    } else {
      navigation.push("TrailerDetails", {
        id: warrant.id,
      });
    }
    await AsyncStorage.setItem("activeWarrant", warrant.id.toString());
  };

  return (
    <Link onPress={onPress}>
      <Box
        width="96%"
        flexDirection="column"
        justifyContent="center"
        marginX="2%"
        marginTop={2}
        padding={2}
        rounded="lg"
        overflow="hidden"
        borderColor={active ? "vtsGreen.500" : "coolGray.200"}
        borderWidth={1}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <View flexDirection="row" alignItems="center">
            <Ionicons
              name="copy"
              size={25}
              color={active ? "#4e73df" : "coolGray.200"}
            />
            <Text marginLeft={2}>{warrant.date}</Text>
          </View>
          <Text>
            {t("general.client")}: {warrant.client}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default WarrantItem;
