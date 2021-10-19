import {
  FontAwesome5,
  MaterialCommunityIcons,
  Foundation,
  Entypo,
} from "@expo/vector-icons";
import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Text, View } from "native-base";
import { RootTabScreenProps } from "../../types";
import { useCustomsStart, useCustomsStop } from "../../api/customs";
import { format } from "date-fns";

const CustomsView = ({
  navigation,
  route,
}: RootTabScreenProps<"CustomsView">) => {
  const { mutate, isSuccess } = useCustomsStart();
  const { mutate: mutateEnd, isSuccess: isEndSuccess } = useCustomsStop();
  const { t } = useTranslation();
  const { customs } = route.params;
  const handleStartTime = () => {
    mutate({
      id: customs.id,
      warrant_id: customs.warrant_id,
      start_time: format(new Date(), "yyyy-MM-dd hh:mm"),
    });
  };
  const handleEndTime = () => {
    mutateEnd({
      id: customs.id,
      warrant_id: customs.warrant_id,
      end_time: format(new Date(), "yyyy-MM-dd hh:mm"),
    });
    navigation.goBack();
  };
  return (
    <Box
      width="96%"
      flexDirection="column"
      justifyContent="center"
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
      <View display="flex" flexDirection="row" marginBottom={2}>
        <Entypo name="location" size={25} color="black" />
        <Text marginLeft={2} alignItems="center" display="flex">
          {t("general.street")}: {customs.address}
        </Text>
      </View>
      <View display="flex" flexDirection="row" marginBottom={2}>
        <MaterialCommunityIcons name="sign-caution" size={25} color="black" />
        <Text marginLeft={2} alignItems="center" display="flex">
          {t("general.terminal")}: {customs.customs_terminal}
        </Text>
      </View>
      <View display="flex" flexDirection="row" marginBottom={2}>
        <FontAwesome5 name="user" size={25} color="black" />
        <Text marginLeft={2} alignItems="center" display="flex">
          {t("general.agent")}: {customs.forwarding_agent}
        </Text>
      </View>
      <View display="flex" flexDirection="row" marginBottom={2}>
        <Foundation name="clipboard-notes" size={25} color="black" />
        <Text marginLeft={2} alignItems="center" display="flex">
          {t("general.agent")}: {customs.description}
        </Text>
      </View>
      {isSuccess || customs.start_time ? (
        <Button width="100%" marginTop={2} isDisabled colorScheme="vtsGreen">
          <FontAwesome5 name="check" size={25} color="#16a06e" />
        </Button>
      ) : (
        <Button
          width="100%"
          marginTop={2}
          onPress={handleStartTime}
          colorScheme="vtsBlue"
          _text={{ color: "white" }}
        >
          {t("customs.start")}
        </Button>
      )}
      {isEndSuccess || customs.end_time ? (
        <Button width="100%" marginTop={2} isDisabled colorScheme="vtsGreen">
          <FontAwesome5 name="check" size={25} color="#16a06e" />
        </Button>
      ) : (
        <Button
          width="100%"
          marginTop={2}
          onPress={handleEndTime}
          colorScheme="vtsBlue"
          _text={{ color: "white" }}
        >
          {t("customs.end")}
        </Button>
      )}
    </Box>
  );
};

export default CustomsView;
