import React from "react";
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colorPalette, Spacing } from "@/styles";
import { wp } from "@/utils";

interface BackButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

export const BackButton = ({
  onPress,
  style,
  iconName = "chevron-back",
  iconSize = 29,
  iconColor = colorPalette.primaryBg.primary,
}: BackButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <TouchableOpacity style={[styles.backButton, style]} onPress={handlePress}>
      <Ionicons name={iconName as any} size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    zIndex: 10,
    minWidth: wp(10),
    minHeight: wp(10),
    borderRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colorPalette.primaryBg.primaryGrey,
    padding: Spacing.xs,
  },
});
