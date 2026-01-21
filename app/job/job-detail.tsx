"use client";

import React from "react";
import { View, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { AppFont, wp } from "@/utils";
import { suggestedJobs } from "@/constants";
import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import { ScreenWrapper, AppHeader, AppText, CircleButton } from "@/components";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const job = suggestedJobs.find((item) => item.id === id);

  const handleBack = () => {
    router.back();
  };

  if (!job) {
    return (
      <ScreenWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
        <AppHeader title="Job Detail" showBackButton onBackPress={handleBack} />
        <View style={styles.notFoundContainer}>
          <AppText text="Job not found." type="description" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
      <AppHeader
        title="Job Detail"
        showBackButton
        onBackPress={handleBack}
        rightAccessory={
          <CircleButton
            iconName="ellipsis-vertical"
            iconSize={wp(6)}
            onPress={() => {}}
          />
        }
      />

      <View style={styles.card}>
        <View style={styles.topSection}>
          <View style={styles.companyNameContainer}>
            <AppText text={job.companyName} type="subHeading" />
            <AppText
              text={job.postedTime}
              type="description"
              style={styles.postedTime}
            />
          </View>
        </View>

        <AppText
          text={job.jobTitle}
          type="primaryHeading"
          style={styles.jobTitle}
        />

        <View style={styles.detailsContainer}>
          {[job.workType, job.location, job.schedule].map((label, index) => (
            <View key={index} style={styles.detailBadge}>
              <AppText text={label} type="description" />
            </View>
          ))}
        </View>

        <View style={styles.bottomSection}>
          <AppText
            text={`${job.applicationsCount} Applied`}
            type="description"
          />
          <View style={styles.salaryContainer}>
            <Ionicons
              name="cash-outline"
              size={20}
              color={colorPalette.primaryBg.primaryBlack}
            />
            <AppText text={job.salaryRange} type="description" />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: colorPalette.primaryBg.tertiary,
    borderRadius: wp(4),
    padding: Spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    marginTop: Spacing.sm,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  companyNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  jobTitle: {
    marginBottom: Spacing.md,
    fontFamily: AppFont.bold,
  },
  postedTime: {
    color: colorPalette.primaryBg.secondaryGrey,
  },
  detailsContainer: {
    flexDirection: "row",
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
    flexWrap: "wrap",
  },
  detailBadge: {
    backgroundColor: colorPalette.primaryBg.primaryGrey,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: 4,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});

