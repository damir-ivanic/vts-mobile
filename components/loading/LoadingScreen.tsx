import React from "react";
import { ActivityIndicator, View } from "react-native";
import tw from "../../helpers/tailwind";

const LoadingScreen = () => {
  return (
    <View style={tw`h-full items-center justify-center`}>
      <ActivityIndicator />
    </View>
  );
};

export default LoadingScreen;
