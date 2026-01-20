import React, { useMemo, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppFont } from "@/utils";
import { Spacing, colorPalette } from "@/styles";
import { AppText } from "./AppText";

export interface JobCardProps {
  companyName: string;
  postedTime: string;
  jobTitle: string;
  location: string;
  workType: string;
  schedule: string;
  applicationsCount: number;
  salaryRange: string;
  onFavoritePress?: (isFavorited: boolean) => void;
  initialFavorited?: boolean;
}

export const JobCard = ({
  companyName,
  postedTime,
  jobTitle,
  location,
  workType,
  schedule,
  applicationsCount,
  salaryRange,
  onFavoritePress,
  initialFavorited = false,
}: JobCardProps) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  const handleFavoritePress = () => {
    const newFavoritedState = !isFavorited;
    setIsFavorited(newFavoritedState);
    onFavoritePress?.(newFavoritedState);
  };

  const jobDetails = useMemo(
    () => [
      { label: workType },
      { label: location },
      { label: schedule },
    ],
    [workType, location, schedule],
  );

  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <View style={styles.companyNameContainer}>
          <AppText text={companyName} type="subHeading" />
          <AppText text={postedTime} type="description" style={styles.postedTime} />
        </View>
        <TouchableOpacity onPress={handleFavoritePress} style={styles.heartButton}>
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={20}
            color={colorPalette.primaryBg.primaryBlack}
          />
        </TouchableOpacity>
      </View>

      <AppText text={jobTitle} type="primaryHeading" style={styles.jobTitle} />

      <View style={styles.detailsContainer}>
        {jobDetails.map((detail, index) => (
          <View key={index} style={styles.detailBadge}>
            <AppText text={detail.label} type="description" />
          </View>
        ))}
      </View>

      <View style={styles.bottomSection}>
        <AppText text={`${applicationsCount} Applied`} type="description" />
        <View style={styles.salaryContainer}>
          <Ionicons name="cash-outline" size={20} color={colorPalette.primaryBg.primaryBlack} />
          <AppText text={salaryRange} type="description" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorPalette.primaryBg.primaryWhite,
    borderRadius: 8,
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
  heartButton: {
    padding: Spacing.xxs,
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
