"use client";

import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { wp } from "@/utils";
import { Spacing } from "@/styles";
import { profileImage } from "@/assets";
import { suggestedJobs, categories } from "@/constants";
import { LayoutStyles, colorPalette } from "@/styles";
import {
  ScreenWrapper,
  AppHeader,
  BackButton,
  AppText,
  SearchBar,
  JobCard,
  SectionHeader,
  CategoryCard,
} from "@/components";

const ICON_SIZE = 20;

export default function HomeScreen() {
  const handleSearch = (text: string) => {
    // TODO: Implement search functionality
    console.log("Search:", text);
  };

  const handleFavoritePress = (isFavorited: boolean) => {
    // TODO: Implement favorite functionality
    console.log("Favorite:", isFavorited);
  };

  const handleSeeAllCategories = () => {
    // TODO: Navigate to categories screen
    console.log("See all categories");
  };

  const renderHeaderLeftAccessory = () => (
    <TouchableOpacity>
      <Image source={profileImage} style={styles.profileImage} contentFit="cover" />
    </TouchableOpacity>
  );

  const renderHeaderMiddleAccessory = () => (
    <View style={styles.middleAccessory}>
      <AppText text="Current Location" type="description" style={styles.locationText} />
      <View style={styles.locationContainer}>
        <Ionicons
          name="location-outline"
          size={ICON_SIZE}
          color={colorPalette.primaryBg.primaryBlack}
        />
        <AppText text="Sterling, Brooklyn" type="subHeading" />
      </View>
    </View>
  );

  const renderHeaderRightAccessory = () => (
    <BackButton iconName="notifications-outline" />
  );

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        leftAccessory={renderHeaderLeftAccessory()}
        middleAccessory={renderHeaderMiddleAccessory()}
        rightAccessory={renderHeaderRightAccessory()}
      />

      <View style={styles.container}>
        <SearchBar placeholder="Search for jobs" onChangeText={handleSearch} />

        <View style={styles.jobSection}>
          <SectionHeader title="Suggested Jobs" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {suggestedJobs.map((job) => (
              <JobCard
                key={job.id}
                companyName={job.companyName}
                postedTime={job.postedTime}
                jobTitle={job.jobTitle}
                location={job.location}
                workType={job.workType}
                schedule={job.schedule}
                applicationsCount={job.applicationsCount}
                salaryRange={job.salaryRange}
                onFavoritePress={handleFavoritePress}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.categorySection}>
          <SectionHeader
            title="Categories"
            showSeeAll={true}
            onPressSeeAll={handleSeeAllCategories}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.label}
                icon={category.icon}
                label={category.label}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Spacing.lg,
  },
  profileImage: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
  },
  middleAccessory: {
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xxs,
  },
  locationText: {
    color: colorPalette.primaryBg.secondaryGrey,
  },
  jobSection: {
    marginTop: Spacing.xs,
  },
  categorySection: {
    marginTop: Spacing.xs,
    paddingVertical: wp(4),
    gap: Spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: wp(0.1),
    paddingVertical: wp(0.5),
    gap: Spacing.md,
  },
});
