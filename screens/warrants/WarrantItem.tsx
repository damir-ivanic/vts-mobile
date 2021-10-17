import { Ionicons } from "@expo/vector-icons";
import { Text, Box, View, Link } from "native-base";
import React from "react";
import { DriverParser, Warrant } from "../../api/warrants";
import { RootTabScreenProps } from "../../types";

type Props = {
  warrant: Warrant;
  navigation: any;
};

const WarrantItem = ({ warrant, navigation }: Props) => {
  const driver = JSON.parse(warrant.driver_info) as DriverParser;

  const active = Boolean(warrant.warrant_start_time);

  console.log(active);

  const onPress = () => {
    if (active) {
      navigation.push("MainMenu", {
        id: warrant.id,
      });
    } else {
      navigation.push("TrailerDetails", {
        id: warrant.id,
      });
    }
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
            <Ionicons name="copy" size={25} color="#4e73df" />
            <Text marginLeft={2}>
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          <Text>JOŠ podataka</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default WarrantItem;
