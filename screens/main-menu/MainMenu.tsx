import React from "react";
import { VirtualizedList } from "react-native";
import { RootTabScreenProps } from "../../types";
import MenuCard from "./MenuCard";

type MenuItem = {
  icon: string;
  route: string;
  text: string;
};

const menuItems = [
  { icon: "fuel", route: "Fuel", text: "fuel" },
  { icon: "road", route: "Toll", text: "toll" },
  { icon: "card-text", route: "Vignette", text: "vignette" },
  { icon: "stop", route: "Stop", text: "stop" },
  {
    icon: "package-variant-closed",
    route: "TruckLoadingList",
    text: "truckLoading",
  },
  {
    icon: "package-variant",
    route: "TruckUnloadingList",
    text: "truckUnloading",
  },

  { icon: "contain", route: "Customs", text: "customs" },
] as MenuItem[];

const getItem = (data: MenuItem[], index: number) => data[index];

const getItemCount = () => menuItems.length;

const MainMenu = ({ navigation, route }: RootTabScreenProps<"MainMenu">) => {
  const { id } = route.params;
  return (
    <VirtualizedList
      data={menuItems}
      initialNumToRender={7}
      renderItem={({ item }) => (
        <MenuCard
          key={item.icon}
          icon={item.icon}
          route={item.route}
          text={item.text}
          navigation={navigation}
          warrantId={id}
        />
      )}
      keyExtractor={(item) => item.icon}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
};

export default MainMenu;
