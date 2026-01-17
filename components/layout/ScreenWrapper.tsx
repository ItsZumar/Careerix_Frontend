import React, { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { LayoutStyles, colorPalette } from "@/styles";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperI {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ScreenWrapper = ({ children, style }: ScreenWrapperI) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={[LayoutStyles.pageContainer, { backgroundColor: colorPalette.primaryBg.primaryWhite }, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: { 
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
});
