"use client";

import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { AppFont, wp, hp } from "@/utils";
import {
  suggestedJobs,
  defaultJobRequirements,
  defaultAboutJobDescription,
  defaultJobDetailData,
} from "@/constants";
import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import { ScreenWrapper, AppHeader, AppText, CircleButton, AppButton } from "@/components";
import { Screens } from "@/enum";
import { peopleIcon, startDateIcon, endDateIcon, profileImage } from "@/assets";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const job = useMemo(
    () => suggestedJobs.find((item) => item.id === id),
    [id]
  );

  const [isFavorited, setIsFavorited] = useState(false);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleFavoritePress = useCallback(() => {
    setIsFavorited((prev) => !prev);
  }, []);

  const handleApply = useCallback(() => {
    if (id) {
      router.push({
        pathname: Screens.JobApply,
        params: { id },
      });
    }
  }, [id]);

  const handleMoreOptions = useCallback(() => {
    // TODO: Implement more options functionality
  }, []);

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
            onPress={handleMoreOptions}
          />
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.contentContainer}>
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
          </View>

          <View style={styles.priceSection}>
            <AppText
              text={`${job.applicationsCount} Applied`}
              type="description"
            />
            <View style={styles.salaryContainer}>
              <Ionicons
                name="cash-outline"
                size={wp(5)}
                color={colorPalette.primaryBg.primaryBlack}
              />
              <AppText text={job.salaryRange} type="description" />
            </View>
          </View>


        </View>

        <View style={styles.peopleContainer}>
          <View style={styles.infoRow}>
            <Image source={peopleIcon} style={styles.infoIcon} />
            <View style={styles.infoContainer}>
              <AppText text="Looking for" type="description" style={styles.infoText} />
              <AppText
                text={defaultJobDetailData.peopleCount}
                type="subHeading"
                style={styles.infoTextDetail}
              />
            </View>
          </View>
          <View style={styles.infoRow}>
            <Image source={startDateIcon} style={styles.infoIcon} />
            <View style={styles.infoContainer}>
              <AppText text="Start Date" type="description" style={styles.infoText} />
              <AppText
                text={defaultJobDetailData.startDate}
                type="subHeading"
                style={styles.infoTextDetail}
              />
            </View>
          </View>
          <View style={styles.infoRow}>
            <Image source={endDateIcon} style={styles.infoIcon} />
            <View style={styles.infoContainer}>
              <AppText text="End Date" type="description" style={styles.infoText} />
              <AppText
                text={defaultJobDetailData.endDate}
                type="subHeading"
                style={styles.infoTextDetail}
              />
            </View>
          </View>
        </View>


        <View style={styles.profileContainer}>
          <Image source={profileImage} style={styles.profileImage} contentFit="cover" />

          <View style={styles.profileInfoContainer}>
            <View style={styles.profileHeader}>
              <AppText
                text={defaultJobDetailData.recruiterName}
                type="subHeading"
                style={styles.profileName}
              />

              <View style={styles.profileRatingContainer}>
                <Ionicons
                  name="star"
                  size={wp(4)}
                  color={colorPalette.primaryBg.primaryYellow}
                />
                <AppText text={defaultJobDetailData.recruiterRating} type="description" />
              </View>
            </View>

            <AppText
              text={defaultJobDetailData.recruiterJobsPosted}
              type="description"
              style={styles.noOfJobsPosted}
            />
          </View>
        </View>

        <View style={styles.aboutJobContainer}>
          <AppText text="About the Job" type="subHeading" style={styles.aboutJobTitle} />
          <AppText text={defaultAboutJobDescription} type="description" />
          <AppText text="Requirements" type="subHeading" style={styles.aboutJobTitle} />
          <View style={styles.requirementsList}>
            {defaultJobRequirements.map((requirement, index) => (
              <View key={index} style={styles.requirementItem}>
                <Ionicons
                  name="checkmark-circle"
                  size={wp(5)}
                  color={colorPalette.primaryBg.primaryBlack}
                  style={styles.checkIcon}
                />
                <AppText text={requirement} type="description" style={styles.requirementText} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.applyButtonContainer}>
        <CircleButton
          iconName={isFavorited ? "heart" : "heart-outline"}
          iconSize={wp(6)}
          iconColor={
            isFavorited
              ? colorPalette.primaryBg.primaryRed
              : colorPalette.primaryBg.primaryBlack
          }
          onPress={handleFavoritePress}
        />
        <View style={styles.applyButtonWrapper}>
          <AppButton text="Apply Now" onPress={handleApply} />
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
  scrollView: {
    paddingBottom: Spacing.lg,
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
    marginTop: Spacing.sm,
  },
  contentContainer: {
    alignItems: "center",
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
    borderRadius: wp(1),
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.sm,
  },
  salaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xxs,
  },
  peopleContainer: {
    marginTop: Spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.sm,
    backgroundColor: colorPalette.primaryBg.tertiary,
    padding: Spacing.md,
    borderRadius: wp(4),
  },
  infoRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  infoIcon: {
    width: wp(6),
    height: wp(6),
  },
  infoContainer: {
    flex: 1,
  },
  infoText: {
    color: colorPalette.primaryBg.secondaryGrey,
    fontSize: hp(1.4),
  },
  infoTextDetail: {
    color: colorPalette.primaryBg.primaryBlack,
    fontSize: hp(1.6),
  },
  profileContainer: {
    marginTop: Spacing.sm,
    backgroundColor: colorPalette.primaryBg.tertiary,
    padding: Spacing.md,
    borderRadius: wp(4),
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
  },
  profileInfoContainer: {
    flex: 1,
  },
  noOfJobsPosted: {
    color: colorPalette.primaryBg.secondaryGrey,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.xs,
  },
  profileName: {
    fontFamily: AppFont.bold,
  },
  profileRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xxs,
  },
  aboutJobContainer: {
    marginTop: Spacing.sm,
  },
  aboutJobTitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  requirementsList: {
    marginTop: Spacing.xs,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  checkIcon: {
    marginTop: Spacing.xxs,
  },
  requirementText: {
    flex: 1,
  },
  applyButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  applyButtonWrapper: {
    flex: 1,
  },
});

