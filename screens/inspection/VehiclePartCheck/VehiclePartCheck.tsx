import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import { View, Button, Text, TextArea, Checkbox, Icon } from "native-base";
import Entypo from "@expo/vector-icons/Entypo";
import { CameraCapturedPicture } from "expo-camera";

import useToggle from "../../../hooks/useToggle";

import { InspectionFormFieldValues, InspectionStep } from "../Inspection.types";

type VehiclePartCheckProps = {
  fieldNameKey: InspectionStep;
  name: string;
  onCameraClose: () => void;
  onCameraOpen: (step: InspectionStep) => void;
  pictureData?: CameraCapturedPicture;
  selectedValues: InspectionFormFieldValues;
  setFieldValue: (fieldName: string, value: any) => void;
};

const VehiclePartCheck: FC<VehiclePartCheckProps> = ({
  fieldNameKey,
  name,
  onCameraClose,
  onCameraOpen,
  pictureData,
  selectedValues,
  setFieldValue,
}) => {
  const { t } = useTranslation();

  const { valid, remark_comment, remark_image } = selectedValues;

  const [isSectionOpen, toggleSection] = useToggle();

  const handleSetFieldValue = (field: string, value: any) =>
    setFieldValue(`${fieldNameKey}.${field}`, value);

  const handleOptionClick = (value: boolean) => {
    handleSetFieldValue("valid", value);

    if (value) {
      toggleSection();

      if (!!remark_image) {
        handleSetFieldValue("image", "");
      }
      if (!!remark_comment) {
        handleSetFieldValue("comment", "");
      }
    }
  };

  useEffect(() => {
    if (pictureData?.base64) {
      handleSetFieldValue("remark_image", pictureData?.base64);
      onCameraClose();
    }
  }, [pictureData]);

  return (
    <View mb={2} p={3} border={1} borderColor="white" borderRadius={4}>
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
                onChange={(event: any) =>
                  handleSetFieldValue(
                    "remark_comment",
                    event.currentTarget.value
                  )
                }
                value={remark_comment}
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
                        !!remark_image ? "pictureAgain" : "proofOfMalfunction"
                      }`
                    )}
                  </Text>
                  <Icon color="white" as={<Entypo name="camera" />} />
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
