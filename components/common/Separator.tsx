import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { colorPalette, Spacing, Fonts } from "@/styles";
import { AppText, type AppTextI } from "./AppText";

interface SeparatorProps {
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
  lineStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textType?: AppTextI["type"];
}

export const Separator = ({
  text = "OR",
  containerStyle,
  lineStyle,
  textStyle,
  textType = "default",
}: SeparatorProps) => {
  return (
    <View style={[styles.separator, containerStyle]}>
      <View style={[styles.separatorLine, lineStyle]} />
      <AppText text={text} type={textType} style={[styles.separatorText, textStyle]} />
      <View style={[styles.separatorLine, lineStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: Spacing.md,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colorPalette.primaryBg.primaryGrey,
  },
  separatorText: {
    marginHorizontal: Spacing.md,
    color: colorPalette.primaryBg.secondaryGrey,
    fontSize: Fonts.size.xs,
  },
});
