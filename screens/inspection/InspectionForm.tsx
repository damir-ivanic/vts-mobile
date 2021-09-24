import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";
import { ScrollView, View, Button } from "native-base";

import { InspectionFormValues, InspectionStep } from "./Inspection.types";
import { inspectionSteps } from "./Inspection.constants";
import VehiclePartCheck from "./VehiclePartCheck";

import { useCameraState } from "../../state-providers/CameraStateProvider";

const InspectionForm = () => {
  const { t } = useTranslation();

  const { capturedData, openCamera } = useCameraState();

  const { values, isSubmitting, submitForm, setFieldValue, isValid, dirty } =
    useFormikContext<InspectionFormValues>();

  const [activeStep, setActiveStep] = useState<InspectionStep>();

  const handleCameraOpen = (step: InspectionStep) => {
    setActiveStep(step);
    openCamera();
  };

  const isSubmitDisabled = isSubmitting || !isValid || !dirty;

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
              capturedData={activeStep === stepKey ? capturedData : undefined}
            />
          );
        })}
      </ScrollView>
      <Button
        onPress={submitForm}
        disabled={isSubmitDisabled}
        colorScheme="vtsBlue"
        _text={{ color: "white" }}
      >
        {t("general.go")}
      </Button>
    </View>
  );
};

export default InspectionForm;
