import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type ErrorPageType = {
  navigation: any;
  route: string;
};

export default function ErrorPage({ navigation, route }: ErrorPageType) {
  return (
    <View>
      <Text>Doslo je do greske, vratite se na Home screen</Text>
      <TouchableOpacity onPress={() => navigation.replace(route)}>
        <Text>Home</Text>
      </TouchableOpacity>
    </View>
  );
}
