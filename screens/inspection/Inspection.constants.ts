import {
  InspectionStepsRecord,
  InspectionFormValues,
} from "./Inspection.types";

export const inspectionSteps: InspectionStepsRecord = {
  tires: {
    key: "tires",
    tKey: "tires",
  },
  electricity_lights: {
    key: "electricity_lights",
    tKey: "electricityLights",
  },
  mirrors: {
    key: "mirrors",
    tKey: "mirrors",
  },
  vehicle_exterior: {
    key: "vehicle_exterior",
    tKey: "vehicleExterior",
  },
  vehicle_interior: {
    key: "vehicle_interior",
    tKey: "vehicleInterior",
  },
  additional_equipment: {
    key: "additional_equipment",
    tKey: "additionalEquipment",
  },
  documentation: {
    key: "documentation",
    tKey: "documentation",
  },
};

export const initialValues: InspectionFormValues = {
  tires: {
    inspection_name: "tires",
    valid: null,
    remark_comment: "",
    remark_image: "",
  },
  electricity_lights: {
    inspection_name: "electricity_lights",
    valid: null,
    remark_comment: "",
    remark_image: "",
  },
  mirrors: {
    inspection_name: "mirrors",
    valid: null,
    remark_comment: "",
    remark_image: "",
  },
  vehicle_exterior: {
    inspection_name: "vehicle_exterior",
    valid: null,
    remark_comment: "",
    remark_image: "",
  },
  vehicle_interior: {
    inspection_name: "vehicle_interior",
    valid: null,
    remark_comment: "",
    remark_image: "",
  },
  additional_equipment: {
    inspection_name: "additional_equipment",
    valid: null,
    remark_comment: "",
    remark_image: "",
  },
  documentation: {
    inspection_name: "documentation",
    valid: null,
    remark_comment: "",
    remark_image: "",
  },
};
