import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "native-base";

const LoadingScreen = () => {
  return (
    <View display="flex" flex="1" justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </View>
  );
};

export default LoadingScreen;
