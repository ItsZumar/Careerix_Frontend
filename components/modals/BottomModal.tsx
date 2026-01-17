import React, { ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity, Modal, StyleProp, ViewStyle, DimensionValue } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "../common/AppText";
import { colorPalette, Spacing } from "@/styles";
import { wp } from "@/utils";

interface BottomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  maxHeight?: DimensionValue;
}

export const BottomModal: React.FC<BottomModalProps> = ({
  visible,
  onClose,
  title,
  children,
  containerStyle,
  maxHeight = "70%",
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={[styles.modalContent, { maxHeight }, containerStyle]} onStartShouldSetResponder={() => true}>
          <View style={styles.modalHeader}>
            {title && <AppText text={title} type="title" />}
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colorPalette.primaryBg.primaryBlack} />
            </TouchableOpacity>
          </View>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colorPalette.primaryBg.primaryWhite,
    borderTopLeftRadius: wp(5), 
    borderTopRightRadius: wp(5),
    paddingBottom: Spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.primaryBg.primaryGrey,
  },
});
