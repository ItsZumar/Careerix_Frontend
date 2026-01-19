import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { colorPalette, Spacing, iconSize, GRADIENT_COLORS } from "@/styles";
import { RippleWrapper } from "../layout/RippleWrapper";

interface SelectableChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const GRADIENT_START = { x: 0, y: 0 } as const;
const GRADIENT_END = { x: 0, y: 1 } as const;
const ICON_SIZE = iconSize * 0.75;
const ICON_NAME = "close" as const;

export const SelectableChip: React.FC<SelectableChipProps> = ({
  label,
  selected,
  onPress,
  style,
}) => {
  const renderCloseIcon = () => {
    if (!selected) return null;

    return (
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
        style={styles.iconContainer}
      >
        <Ionicons
          name={ICON_NAME}
          size={ICON_SIZE}
          color={colorPalette.primaryBg.primaryWhite}
        />
      </LinearGradient>
    );
  };

  return (
    <RippleWrapper
      onPress={onPress}
      containerStyle={styles.container}
      rippleColor={colorPalette.primaryBg.primaryOrange}
    >
      <View style={[styles.chip, selected && styles.chipSelected, style]}>
        {renderCloseIcon()}
        <AppText
          text={label}
          type="default"
          style={[styles.label, selected && styles.labelSelected]}
        />
      </View>
    </RippleWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginBottom: Spacing.md,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: Spacing.xl,
    borderWidth: 1,
    borderColor: colorPalette.primaryBg.primaryGrey,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  chipSelected: {
    backgroundColor: colorPalette.primaryBg.orangeWithOpacity,
    borderColor: colorPalette.primaryBg.primaryOrange,
  },
  iconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.xs,
  },
  label: {
    color: colorPalette.primaryBg.primaryBlack,
  },
  labelSelected: {
    color: colorPalette.primaryBg.primaryOrange,
  },
});

export default SelectableChip;
