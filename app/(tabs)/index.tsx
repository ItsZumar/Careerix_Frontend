"use client";

import React from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, FlatList,  } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";

import { wp } from "@/utils";
import { Screens } from "@/enum";
import { Spacing } from "@/styles";
import { profileImage, filterIcon } from "@/assets";
import { suggestedJobs, categories } from "@/constants";
import { LayoutStyles, colorPalette } from "@/styles";
import {
  ScreenWrapper,
  AppHeader,
  CircleButton,
  AppText,
  SearchBar,
  JobCard,
  SectionHeader,
  CategoryCard,
} from "@/components";

const ICON_SIZE = 20;

export default function HomeScreen() {
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
    <CircleButton
      iconName="notifications-outline"
      onPress={() => router.push(Screens.Notifications as Href)}
    />
  );

  const renderSuggestedJobCard = (job: (typeof suggestedJobs)[number]) => (
    <JobCard
      companyName={job.companyName}
      postedTime={job.postedTime}
      jobTitle={job.jobTitle}
      location={job.location}
      workType={job.workType}
      schedule={job.schedule}
      applicationsCount={job.applicationsCount}
      salaryRange={job.salaryRange}
      onFavoritePress={handleFavoritePress}
      onPress={() =>
        router.push({
          pathname: Screens.JobDetail,
          params: { id: job.id },
        } as Href)
      }
    />
  );

  const renderListHeader = () => (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push(Screens.JobSearch as Href)}
      >
        <SearchBar
          placeholder="Search for jobs"
          editable={false}
          containerStyle={{ pointerEvents: "none" }}
          rightIcon={filterIcon}
        />
      </TouchableOpacity>

      <View style={styles.jobSection}>
        <SectionHeader title="Suggested Jobs" />
        <FlatList
          horizontal
          data={suggestedJobs}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          renderItem={({ item }) => (
            <View>
              {renderSuggestedJobCard(item)}
            </View>
          )}
        />
      </View>

      <View style={styles.categorySection}>
        <SectionHeader
          title="Categories"
          showSeeAll
          onPressSeeAll={handleSeeAllCategories}
        />
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item.label}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          renderItem={({ item }) => (
            <CategoryCard icon={item.icon} label={item.label} />
          )}
        />
      </View>
    </View>
  );

  const renderJobItem = ({ item }: { item: (typeof suggestedJobs)[number] }) => (
    <View>
      {renderSuggestedJobCard(item)}
    </View>
  );

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <AppHeader
        leftAccessory={renderHeaderLeftAccessory()}
        middleAccessory={renderHeaderMiddleAccessory()}
        rightAccessory={renderHeaderRightAccessory()}
      />

      <FlatList
        data={suggestedJobs}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        renderItem={renderJobItem}
        contentContainerStyle={styles.listContent}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
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
    paddingHorizontal: wp(.5),
    paddingVertical: wp(0.5),
    gap: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing.lg,
    paddingHorizontal: wp(0.5),
  },
});
