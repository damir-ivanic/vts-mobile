import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button, Icon, Text } from "native-base";
import { useTranslation } from "react-i18next";

const MenuCard = ({ navigation, icon, route, text }: any) => {
  const { t } = useTranslation();
  const handleClick = () => {
    navigation.navigate(route);
  };

  return (
    <Button
      onPress={handleClick}
      colorScheme="vtsBlue"
      _text={{ color: "white" }}
      borderRadius={10}
      display="flex"
      padding={15}
      margin={15}
      width="95%"
      justifyContent="center"
      alignItems="center"
      startIcon={<Icon as={MaterialCommunityIcons} name={icon} />}
    >
      <Text color="white">{t(`mainMenu.${text}`)}</Text>
    </Button>
  );
};

export default MenuCard;
