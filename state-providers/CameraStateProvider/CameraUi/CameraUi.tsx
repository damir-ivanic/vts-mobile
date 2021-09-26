import React, { forwardRef } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { Camera as CameraBase, Constants } from "expo-camera";
import { Modal, Icon } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { border } from "styled-system";

interface CameraUiProps {
  closeCamera: () => void;
  isPreviewingPicture: boolean;
  retakePicture: () => void;
  takePicture: () => void;
}

const CameraUi = forwardRef<CameraBase | null, CameraUiProps>(
  (
    { closeCamera, isPreviewingPicture, retakePicture, takePicture },
    cameraRef
  ) => (
    <Modal isOpen>
      <CameraBase
        useCamera2Api
        ref={cameraRef}
        type={Constants.Type.back}
        style={styles.cameraContainer}
      >
        <View style={styles.ctaTopContainer}>
          <Pressable onPress={closeCamera}>
            <Icon size={12} as={<MaterialCommunityIcons name="close" />} />
          </Pressable>
        </View>
        <View style={styles.ctaBottomContainer}>
          <Pressable
            onPress={isPreviewingPicture ? retakePicture : takePicture}
          >
            <Icon
              size={12}
              as={
                <MaterialCommunityIcons
                  name={isPreviewingPicture ? "camera-retake" : "camera"}
                />
              }
            />
          </Pressable>
          {isPreviewingPicture && (
            <Pressable onPress={closeCamera} style={styles.confirmButton}>
              <Icon
                size={12}
                as={<MaterialCommunityIcons name="arrow-right-circle" />}
              />
            </Pressable>
          )}
        </View>
      </CameraBase>
    </Modal>
  )
);

const styles = StyleSheet.create({
  cameraContainer: {
    width: "100%"
  },
  ctaTopContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "rgba(187,187,189,0.5)"
  },
  ctaBottomContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    backgroundColor: "rgba(187,187,189,0.5)"
  },
  confirmButton: {
    position: "absolute",
    right: 0,
  },
});

export default CameraUi;
