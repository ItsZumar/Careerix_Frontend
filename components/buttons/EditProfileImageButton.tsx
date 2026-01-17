import React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorPalette, Spacing } from "@/styles";
import { wp } from "@/utils";

interface EditProfileImageButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

export const EditProfileImageButton = ({
  onPress,
  style,
  iconName = "camera-outline",
  iconSize = wp(4.4),
  iconColor = "black",
}: EditProfileImageButtonProps) => {
  return (
    <TouchableOpacity style={[styles.editButton, style]} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    bottom: wp(0),
    right: wp(31),
    backgroundColor: colorPalette.primaryBg.transparentWhite,
    borderRadius: wp(10),
    padding: Spacing.xxs,
    borderWidth: wp(1),
    borderColor: colorPalette.primaryBg.primaryWhite,
  },
});
