import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import LoginScreen from "../screens/login/LoginScreen";
import MainMenu from "../screens/main-menu/MainMenu";
import Vignette from "../screens/vignette/Vignette";
import Toll from "../screens/toll/Toll";
import Fuel from "../screens/fuel/Fuel";
import { useAuthentication } from "../hooks/useAuthentication";
import TruckDetails from "../screens/details/TruckDetails";
import TrailerDetails from "../screens/details/TrailerDetails";
import Inspection from "../screens/inspection/Inspection";
import { useTranslation } from "react-i18next";
import Start from "../screens/start/Start";
import LoadingScreen from "../components/loading/LoadingScreen";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const login = {
  name: "LoginScreen",
  component: LoginScreen,
  header: "login",
  backButton: false,
};

const inspection = [
  {
    name: "TruckDetails",
    component: TruckDetails,
    header: "truckDetails",
    backButton: false,
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
];

const routes = [
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
];

const inspectionRoutes = [...inspection, ...routes];
const authROutes = [login, ...inspectionRoutes];

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { state } = useAuthentication();
  const { t } = useTranslation();

  if (!state.loadingFinished) {
    return (
      <Stack.Navigator>
        <Stack.Screen name={"LoadingScreen"} component={LoadingScreen} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}
    >
      {state.token
        ? state.activeTravelWarrant
          ? routes.map((route) => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
              />
            ))
          : inspectionRoutes.map((route) => (
              <Stack.Screen
                key={route.name}
                name={route.name}
                component={route.component}
                options={{
                  title: t(`screens.${route.header}`),
                  headerBackVisible: route.backButton,
                }}
              />
            ))
        : authROutes.map((route) => (
            <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />
          ))}
    </Stack.Navigator>
  );
}
