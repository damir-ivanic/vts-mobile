import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import Customs from "../screens/customs/Customs";
import TrailerDetails from "../screens/details/TrailerDetails";
import Fuel from "../screens/fuel/Fuel";
import Inspection from "../screens/inspection";
import MainMenu from "../screens/main-menu/MainMenu";
import Start from "../screens/start/Start";
import Stop from "../screens/stop/Stop";
import Toll from "../screens/toll/Toll";
import TruckLoadingList from "../screens/truck-loading/TruckLoadingList";
import TruckUnloadingList from "../screens/truck-unloading/TruckUnloadingList";
import Vignette from "../screens/vignette/Vignette";
import Warrants from "../screens/warrants/Warrants";

const Stack = createNativeStackNavigator();

const routes = [
  {
    name: "Warrants",
    component: Warrants,
    header: "warrants",
    backButton: true,
  },
  {
    name: "TrailerDetails",
    component: TrailerDetails,
    header: "trailerDetails",
    backButton: false,
  },
  {
    name: "Inspection",
    component: Inspection,
    header: "inspection",
    backButton: false,
  },
  {
    name: "Start",
    component: Start,
    header: "start",
    backButton: false,
  },
  {
    name: "MainMenu",
    component: MainMenu,
    header: "mainMenu",
    backButton: false,
  },
  {
    name: "Fuel",
    component: Fuel,
    header: "fuel",
    backButton: true,
  },
  {
    name: "Toll",
    component: Toll,
    header: "toll",
    backButton: true,
  },
  {
    name: "Vignette",
    component: Vignette,
    header: "vignette",
    backButton: true,
  },
  {
    name: "TruckLoadingList",
    component: TruckLoadingList,
    header: "loadingList",
    backButton: true,
  },
  {
    name: "TruckUnloadingList",
    component: TruckUnloadingList,
    header: "unloadingList",
    backButton: true,
  },
  {
    name: "Stop",
    component: Stop,
    header: "stop",
    backButton: true,
  },
  {
    name: "Customs",
    component: Customs,
    header: "customs",
    backButton: true,
  },
];

const WarrantStack = () => {
  const { t } = useTranslation();
  return (
    <Stack.Navigator>
      {routes.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            title: t(`screens.${route.header}`),
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default WarrantStack;
