import React from "react";
import { TextInput, Text, View } from "react-native";

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
    <View>
      <Text>{label}</Text>
      <TextInput
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
