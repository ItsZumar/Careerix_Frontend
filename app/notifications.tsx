"use client";

import React from "react";
import { View, StyleSheet } from "react-native";

import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import { ScreenWrapper, AppHeader, AppText } from "@/components";

export default function NotificationsScreen() {
  return (
    <ScreenWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
      <AppHeader title="Notifications" showBackButton />

      <View style={styles.content}>
        <AppText
          text="You have no notifications yet."
          type="description"
          style={styles.emptyText}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  content: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  emptyText: {
    textAlign: "center",
  },
});

