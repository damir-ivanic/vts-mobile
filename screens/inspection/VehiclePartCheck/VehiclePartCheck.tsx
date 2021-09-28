import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import { View, Button, Text, TextArea, Checkbox, Icon } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CameraCapturedPicture } from "expo-camera";

import useToggle from "../../../hooks/useToggle";

import { InspectionFormFieldValues, InspectionStep } from "../Inspection.types";

type VehiclePartCheckProps = {
  fieldNameKey: InspectionStep;
  name: string;
  onCameraOpen: (step: InspectionStep) => void;
  capturedData?: CameraCapturedPicture;
  selectedValues: InspectionFormFieldValues;
  setFieldValue: (fieldName: string, value: any) => void;
};

const VehiclePartCheck: FC<VehiclePartCheckProps> = ({
  fieldNameKey,
  name,
  onCameraOpen,
  capturedData,
  selectedValues,
  setFieldValue,
}) => {
  const { t } = useTranslation();

  const { valid, remark_comment: remarkComment, remark_image: remarkImage } = selectedValues;

  const [isSectionOpen, toggleSection] = useToggle();

  const handleSetFieldValue = (field: string, value: any) =>
    setFieldValue(`${fieldNameKey}.${field}`, value);

  const handleOptionClick = (value: boolean) => {
    handleSetFieldValue("valid", value);

    if (value) {
      toggleSection();

      if (!!remarkImage) {
        handleSetFieldValue("remark_image", "");
      }
      if (!!remarkComment) {
        handleSetFieldValue("remark_comment", "");
      }
    }
  };

  useEffect(() => {
    if (capturedData?.base64) {
      handleSetFieldValue("remark_image", capturedData.base64);
    }
  }, [capturedData]);

  return (
    <View
      mb={2}
      p={3}
      border={1}
      borderColor="rgb(202,203,214)"
      borderRadius={4}
    >
      <Pressable onPress={toggleSection}>
        <View flexDirection="row">
          <Checkbox
            isChecked={valid !== null}
            isDisabled={valid !== null}
            value="valid"
            marginRight={4}
            accessibilityLabel="Section checkbox"
            onChange={toggleSection}
          />
          <Text>{name}</Text>
        </View>
      </Pressable>
      {isSectionOpen && (
        <>
          <View
            flexDirection="row"
            justifyContent="space-between"
            mt={4}
            mb={2}
          >
            <Button
              size="lg"
              onPress={() => handleOptionClick(false)}
              colorScheme="vtsBlue"
              _text={{ color: "white" }}
            >
              {t("general.no")}
            </Button>
            <Button
              size="lg"
              colorScheme="vtsGreen"
              _text={{ color: "white" }}
              onPress={() => handleOptionClick(true)}
            >
              {t("general.ok")}
            </Button>
          </View>
          {valid === false && (
            <View>
              <TextArea
                onChangeText={(text) =>
                  handleSetFieldValue("remark_comment", text)
                }
                value={remarkComment}
                placeholder={t("inspection.remarks")}
              />
              <Button
                mt={2}
                size="sm"
                onPress={() => onCameraOpen(fieldNameKey)}
                colorScheme="vtsBlue"
                _text={{ color: "white" }}
              >
                <View flexDirection="row" alignItems="center">
                  <Text color="white" mr={2}>
                    {t(
                      `inspection.${
                        !!remarkImage ? "pictureAgain" : "proofOfMalfunction"
                      }`
                    )}
                  </Text>
                  <Icon
                    color="white"
                    as={
                      <MaterialCommunityIcons
                        name={!!remarkImage ? "camera-retake" : "camera"}
                      />
                    }
                  />
                </View>
              </Button>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default VehiclePartCheck;
