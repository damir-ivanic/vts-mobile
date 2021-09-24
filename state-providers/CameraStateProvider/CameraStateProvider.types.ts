import { CameraCapturedPicture } from "expo-camera";
import { ReactNode } from "react";

export interface CameraContextProps {
  capturedData?: CameraCapturedPicture;
  openCamera: () => void;
}

export interface CameraStateProviderProps {
  children?: ReactNode;
}
