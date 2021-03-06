import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import LoginScreen from "../screens/login/LoginScreen";
import { useAuthentication } from "../hooks/useAuthentication";
import TruckDetails from "../screens/details/TruckDetails";
import { useTranslation } from "react-i18next";
import LoadingScreen from "../components/loading/LoadingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Settings from "../screens/settings/Settings";
import WarrantStack from "./WarrantStack";
import { Ionicons } from "@expo/vector-icons";

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
