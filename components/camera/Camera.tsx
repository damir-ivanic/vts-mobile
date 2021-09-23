import React, { useState, useEffect, forwardRef, FC } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Camera as CameraBase, Constants, PermissionStatus } from "expo-camera";
import { View } from "react-native";

const windowHeight = Dimensions.get("window").height;
const captureSize = Math.floor(windowHeight * 0.08);

type CameraProps = {
  onTakePicture: () => void;
};

const Camera = forwardRef<CameraBase | null, CameraProps>(
  ({ onTakePicture }, cameraRef) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    const handleGetCameraPermission = async () => {
      try {
        const { status } = await CameraBase.requestCameraPermissionsAsync();

        setHasPermission(status === PermissionStatus.GRANTED);
      } catch (error) {
        // @TODO: Handle error
      }
    };

    useEffect(() => {
      handleGetCameraPermission();
    }, []);

    // @TODO: Handle `false` - User declines camera access
    if (!hasPermission) {
      return null;
    }

    return (
      <View style={styles.container}>
        <CameraBase
          useCamera2Api
          ref={cameraRef}
          type={Constants.Type.back}
          style={styles.container}
        />
        <View style={styles.ctaBottomContainer}>
          <TouchableOpacity onPress={onTakePicture} style={styles.capture} />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  ctaBottomContainer: {
    position: "absolute",
    flexDirection: "row",
    bottom: 2,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  capture: {
    backgroundColor: "grey",
    height: captureSize,
    width: captureSize,
    borderRadius: Math.floor(captureSize / 2),
    marginBottom: 10,
  },
});

export default Camera;
