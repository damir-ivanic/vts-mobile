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
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Warrants from "../screens/warrants/Warrants";
import Settings from "../screens/settings/Settings";
import Ionicons from "react-native-vector-icons/Ionicons";
import WarrantStack from "./WarrantStack";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
  return !state.token ? (
    <Stack.Navigator
      screenOptions={{ contentStyle: { backgroundColor: "white" } }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          title: t(`screens.login`),
        }}
      />
    </Stack.Navigator>
  ) : (
    <Tab.Navigator>
      <Tab.Screen
        name={t(`screens.home`)}
        component={TruckDetails}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
          title: t(`screens.home`),
        }}
      />
      <Tab.Screen
        name={t(`screens.warrants`)}
        component={WarrantStack}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="copy" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={t(`screens.settings`)}
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="settings" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
