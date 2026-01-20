import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { AppText } from "./AppText";
import { BackButton } from "../buttons/BackButton";
import { colorPalette } from "@/styles";

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  middleAccessory?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<ViewStyle>;
}

export const AppHeader = ({
  title,
  showBackButton = false,
  onBackPress,
  leftAccessory,
  rightAccessory,
  middleAccessory,
  style,
  titleStyle,
}: AppHeaderProps) => {
  const renderLeftAccessory = () => {
    if (leftAccessory) return leftAccessory;
    if (showBackButton) return <BackButton onPress={onBackPress} />;
    return null;
  };

  const renderMiddleAccessory = () => {
    if (middleAccessory) return middleAccessory;
    if (title) {
      return (
        <View style={[styles.titleContainer, titleStyle]}>
          <AppText text={title} type="title" />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>{renderLeftAccessory()}</View>

      <View style={styles.middleSection}>{renderMiddleAccessory()}</View>

      <View style={styles.rightSection}>{rightAccessory}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  leftSection: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  middleSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
