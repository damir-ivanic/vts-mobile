import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  VFC,
} from "react";
import {
  Camera as CameraBase,
  CameraCapturedPicture,
  PermissionStatus,
} from "expo-camera";

import {
  CameraContextProps,
  CameraStateProviderProps,
} from "./CameraStateProvider.types";
import { cameraPictureOptions } from "./CameraStateProvider.constants";
import CameraUi from "./CameraUi";
import { Keyboard } from "react-native";

export const CameraContext = createContext<CameraContextProps | undefined>(
  undefined
);

export const useCameraState = (): CameraContextProps => {
  const context = useContext(CameraContext);

  if (!context) {
    throw new Error("useCameraState must be used within CameraStateProvider");
  }

  return context;
};

const CameraStateProvider: VFC<CameraStateProviderProps> = ({ children }) => {
  const cameraRef = useRef<CameraBase | null>(null);

  const [hasAccessPermission, setHasAccessPermission] = useState(false);
  const [isCameraOpen, setCameraOpen] = useState(false);

  const [isPreviewingPicture, setPreviewingPicture] = useState(false);
  const [capturedData, setCapturedData] = useState<CameraCapturedPicture>();

  const handleOpenCamera = useCallback(async () => {
    // Keyboard.dismiss();
    try {
      const { status } = await CameraBase.requestCameraPermissionsAsync();

      setHasAccessPermission(status === PermissionStatus.GRANTED);
      setCameraOpen(true);
    } catch (error) {
      // @TODO: Handle error
    }
  }, []);

  const handleRetakePicture = useCallback(async () => {
    try {
      await cameraRef.current!.resumePreview();
      setPreviewingPicture(false);
      setCapturedData(undefined);
    } catch (error) {
      // @TODO: Handle error
    }
  }, []);

  const handleTakePicture = useCallback(async () => {
    try {
      const data = await cameraRef.current!.takePictureAsync(
        cameraPictureOptions
      );

      if (data?.base64) {
        await cameraRef.current!.pausePreview();

        setPreviewingPicture(true);
      }

      setCapturedData(data);
    } catch (error) {
      // @TODO: Handle error
    }
  }, []);

  const handleCloseCamera = useCallback(() => {
    setCameraOpen(false);
    setPreviewingPicture(false);
    setCapturedData(undefined);
  }, []);

  const contextValue: CameraContextProps = {
    capturedData,
    openCamera: handleOpenCamera,
  };

  return (
    <CameraContext.Provider value={contextValue}>
      {children}
      {hasAccessPermission && isCameraOpen && (
        <CameraUi
          ref={cameraRef}
          isPreviewingPicture={isPreviewingPicture}
          closeCamera={handleCloseCamera}
          retakePicture={handleRetakePicture}
          takePicture={handleTakePicture}
        />
      )}
    </CameraContext.Provider>
  );
};

export default CameraStateProvider;
