import React, { ReactNode } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import tw from "../../helpers/tailwind";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`py-5 h-full`}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default Container;
