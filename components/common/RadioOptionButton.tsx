import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "./AppText";
import { Spacing, colorPalette } from "@/styles";
import { wp } from "@/utils";

export interface RadioOptionButtonProps<T> {
  label: string;
  value: T;
  selectedValue: T | null;
  onPress: (value: T) => void;
}

export const RadioOptionButton = <T,>({
  label,
  value,
  selectedValue,
  onPress,
}: RadioOptionButtonProps<T>) => {
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
      onPress={() => onPress(value)}
    >
      <View style={styles.optionContent}>
        <Ionicons
          name={isSelected ? "radio-button-on" : "radio-button-off"}
          size={wp(5)}
          color={
            isSelected
              ? colorPalette.primaryBg.primaryOrange
              : colorPalette.primaryBg.secondaryGrey
          }
        />
        <AppText text={label} type="description" style={styles.optionText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: wp(12),
    borderWidth: 1,
    borderColor: colorPalette.primaryBg.primaryGrey,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  optionButtonSelected: {
    borderColor: colorPalette.primaryBg.primaryOrange,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    justifyContent: "center",
  },
  optionText: {
    color: colorPalette.primaryBg.primaryBlack,
  },
});
