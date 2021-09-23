import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { ScrollView, View, Button } from "native-base";
import {
  Camera as CameraBase,
  CameraCapturedPicture,
  CameraPictureOptions,
} from "expo-camera";

import useToggle from "../../hooks/useToggle";

import Camera from "../../components/camera";

import { InspectionFormValues, InspectionStep } from "./Inspection.types";
import { inspectionSteps } from "./Inspection.constants";
import VehiclePartCheck from "./VehiclePartCheck";

const InspectionForm = () => {
  const { t } = useTranslation();

  // @TODO: `useCamera` hook should be responsible for camera interaction
  const cameraRef = useRef<CameraBase | null>(null);

  const { values, isSubmitting, submitForm, setFieldValue, isValid } =
    useFormikContext<InspectionFormValues>();

  const [isCameraOpen, toggleCamera] = useToggle();
  const [activeStep, setActiveStep] = useState<InspectionStep>();
  const [pictureData, setPictureData] = useState<CameraCapturedPicture>();

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const options: CameraPictureOptions = { quality: 0.7, base64: true };
        const data = await cameraRef.current.takePictureAsync(options);

        setPictureData(data);
      } catch (error) {
        // @TODO: Handle error
      }
    }
  };

  const handleCameraOpen = (step: InspectionStep) => {
    setActiveStep(step);
    toggleCamera();
  };

  const handleCameraClose = () => {
    toggleCamera();
    setPictureData(undefined);
    setActiveStep(undefined);
  };

  return (
    <View width="100%">
      <ScrollView height="92%">
        {Object.values(inspectionSteps).map((step) => {
          const stepKey = step.key as keyof typeof inspectionSteps;
          const selectedValues = values[stepKey];

          return (
            <VehiclePartCheck
              key={step.key}
              name={t(`inspection.${step.tKey}`)}
              fieldNameKey={step.key as InspectionStep}
              setFieldValue={setFieldValue}
              selectedValues={selectedValues}
              onCameraOpen={handleCameraOpen}
              onCameraClose={handleCameraClose}
              pictureData={activeStep === stepKey ? pictureData : undefined}
            />
          );
        })}
      </ScrollView>
      <Button
        onPress={submitForm}
        disabled={isSubmitting || !isValid}
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
      >
        {t("general.go")}
      </Button>
      {isCameraOpen && (
        <Camera ref={cameraRef} onTakePicture={handleTakePicture} />
      )}
    </View>
  );
};

export default InspectionForm;
