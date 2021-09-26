import { StatusBar } from "expo-status-bar";
import React from "react";
import "./i18n";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { extendTheme, NativeBaseProvider } from "native-base";
import { AuthenticationProvider } from "./hooks/useAuthentication";
import CameraStateProvider from "./state-providers/CameraStateProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import tw from "./helpers/tailwind";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  },
});

const theme = extendTheme({
  colors: {
    vtsDarkGray: {
      500: "#5a5c69",
      700: "#5a5c69",
    },
    vtsGray: {
      500: "#858796",
      700: "#858796",
    },
    vtsLightGray: {
      500: "#dddfeb",
      700: "#dddfeb",
    },
    vtsBlue: {
      500: "#4e73df",
      700: "#4e73df",
    },
    vtsGreen: {
      500: "#1cc88a",
      700: "#1cc88a",
    },
    vtsRed: {
      500: "#e74a3b",
      700: "#e74a3b",
    },
  },
  config: {
    initialColorMode: "light",
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <AuthenticationProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaProvider style={tw`p-5`}>
              <CameraStateProvider>
                <Navigation />
                <StatusBar />
              </CameraStateProvider>
            </SafeAreaProvider>
          </QueryClientProvider>
        </AuthenticationProvider>
      </NativeBaseProvider>
    );
  }
}
