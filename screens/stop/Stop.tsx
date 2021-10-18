import React from "react";
import { View, Text } from "react-native";
import { useStopReasons } from "../../api/stop";

const Stop = () => {
  const { data } = useStopReasons();
  return (
    <View>
      <Text>Stop</Text>
    </View>
  );
};

export default Stop;
