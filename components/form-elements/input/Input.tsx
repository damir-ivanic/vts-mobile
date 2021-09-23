import React from "react";
import { TextInput, Text, View } from "react-native";
import tw from "../../../helpers/tailwind";

type Props = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue: string | undefined;
  secureTextEntry?: boolean;
  handleChange: any;
  handleBlur: any;
  disabled?: boolean;
};

const Input = ({
  defaultValue,
  placeholder,
  label,
  name,
  secureTextEntry,
  handleChange,
  handleBlur,
  disabled,
}: Props) => {
  return (
    <View style={tw`p-2`}>
      <Text style={tw`p-2`}>{label}</Text>
      <TextInput
        style={tw`h-10 border-2`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        secureTextEntry={secureTextEntry}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        disableFullscreenUI={disabled}
      />
    </View>
  );
};

export default Input;
