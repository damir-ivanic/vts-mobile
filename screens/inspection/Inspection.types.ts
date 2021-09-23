export type InspectionStep =
  | "tires"
  | "electricity_lights"
  | "mirrors"
  | "vehicle_exterior"
  | "vehicle_interior"
  | "additional_equipment"
  | "documentation";

export type InspectionStepsRecord = Record<
  InspectionStep,
  { key: string; tKey: string }
>;

// --------------------
// Form type values
// --------------------

export type InspectionFormFieldValues = {
  inspection_name: string;
  valid: boolean | null;
  remark_comment: string;
  remark_image: string;
};

export type InspectionFormValues = Record<
  InspectionStep,
  InspectionFormFieldValues
>;
