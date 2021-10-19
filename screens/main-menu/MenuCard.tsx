import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Box, Icon, Link, Text, View } from "native-base";
import { useTranslation } from "react-i18next";

const MenuCard = ({ navigation, icon, route, text, warrantId }: any) => {
  const { t } = useTranslation();
  const handleClick = () => {
    navigation.navigate(route, {
      id: warrantId,
    });
  };

  return (
    <Link onPress={handleClick}>
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
        <Icon as={MaterialCommunityIcons} name={icon} />
        <Text marginLeft={2}>{t(`mainMenu.${text}`)}</Text>
      </Box>
    </Link>
  );
};

export default MenuCard;
