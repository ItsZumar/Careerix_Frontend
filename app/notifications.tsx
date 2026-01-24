"use client";

import React, { useCallback } from "react";
import { View, StyleSheet, SectionList } from "react-native";

import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import { ScreenWrapper, AppHeader, AppText, NotificationCard } from "@/components";
import { notificationSections, type Notification, type NotificationSection } from "@/constants";
import { wp } from "@/utils";

export default function NotificationsScreen() {
  const renderNotificationItem = useCallback(
    ({ item }: { item: Notification }) => {
      const handleActionPress = () => {
        // TODO: Implement navigation based on notification type
        console.log("Action pressed for notification:", item.id, item.type);
      };

      return (
        <NotificationCard
          notification={item}
          onActionPress={handleActionPress}
        />
      );
    },
    []
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: NotificationSection }) => (
      <View style={styles.sectionHeader}>
        <AppText text={section.title} type="subHeading" style={styles.sectionTitle} />
      </View>
    ),
    []
  );

  const renderEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <AppText
          text="You have no notifications yet."
          type="description"
          style={styles.emptyText}
        />
      </View>
    ),
    []
  );

  return (
    <ScreenWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
      <AppHeader title="Notifications" showBackButton />

      <SectionList
        sections={notificationSections}
        renderItem={renderNotificationItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyComponent}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  sectionHeader: {
    marginTop: Spacing.xxs,
  },
  sectionTitle: {
    color: colorPalette.primaryBg.secondaryGrey,
  },
  sectionSeparator: {
    height: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: Spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: colorPalette.primaryBg.secondaryGrey,
  },
});

