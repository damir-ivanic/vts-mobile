import { Box } from "native-base";
import React from "react";
import { RootTabScreenProps } from "../../types";
import MenuCard from "./MenuCard";

const menuItems = [
  { icon: "fuel", route: "Fuel", text: "fuel" },
  { icon: "road", route: "Toll", text: "toll" },
  { icon: "card", route: "Vignette", text: "vignette" },
];

const MainMenu = ({ navigation }: RootTabScreenProps<"MainMenu">) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {menuItems.map((item) => (
        <MenuCard
          key={item.icon}
          icon={item.icon}
          route={item.route}
          text={item.text}
          navigation={navigation}
        />
      ))}
    </Box>
  );
};

export default MainMenu;
