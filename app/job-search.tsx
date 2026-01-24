"use client";

import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { router, type Href } from "expo-router";

import { wp } from "@/utils";
import { filterIcon, arrangeIcon } from "@/assets";
import { LayoutStyles, Spacing, colorPalette, iconSize } from "@/styles";
import { ScreenWrapper, AppHeader, AppText, SearchBar, Picker, JobCard } from "@/components";
import { Screens } from "@/enum";
import {
  suggestedJobs,
  FILTER_CONFIG,
} from "@/constants";

interface FilterState {
  jobType: string;
  datePosted: string;
  salary: string;
  location: string;
}

export default function JobSearchScreen() {
  const [filters, setFilters] = useState<FilterState>({
    jobType: "",
    datePosted: "",
    salary: "",
    location: "",
  });

  const handleFavoritePress = useCallback((isFavorited: boolean) => {
    // TODO: Implement favorite functionality
    console.log("Favorite:", isFavorited);
  }, []);

  const handleSearch = useCallback((text: string) => {
    // TODO: Implement job search functionality
    console.log("Job search:", text);
  }, []);

  const handleFilterChange = useCallback((key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      // TODO: Apply filters to job search results
      console.log("Filters updated:", updated);
      return updated;
    });
  }, []);

  const filterConfigs = useMemo(
    () =>
      FILTER_CONFIG.map((config) => ({
        ...config,
        value: filters[config.id as keyof FilterState],
        onChange: (value: string) => handleFilterChange(config.id as keyof FilterState, value),
      })),
    [filters, handleFilterChange]
  );

  const renderPickerItem = useCallback(
    ({ item }: { item: typeof filterConfigs[number] }) => (
      <View style={styles.pickerItem}>
        <Picker
          placeholder={item.placeholder}
          options={item.options}
          value={item.value}
          onValueChange={item.onChange}
        />
      </View>
    ),
    []
  );

  const renderJobItem = useCallback(
    ({ item }: { item: (typeof suggestedJobs)[number] }) => (
      <JobCard
        companyName={item.companyName}
        postedTime={item.postedTime}
        jobTitle={item.jobTitle}
        location={item.location}
        workType={item.workType}
        schedule={item.schedule}
        applicationsCount={item.applicationsCount}
        salaryRange={item.salaryRange}
        onFavoritePress={handleFavoritePress}
        onPress={() =>
          router.push({
            pathname: Screens.JobDetail,
            params: { id: item.id },
          } as Href)
        }
      />
    ),
    [handleFavoritePress]
  );

  const handleArrangePress = useCallback(() => {
    // TODO: Implement arrange/sort functionality
    console.log("Arrange pressed");
  }, []);


  return (
    <ScreenWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
      <AppHeader title="Job Search" showBackButton />

      <View style={styles.content}>
        <SearchBar
          placeholder="Researcher"
          onChangeText={handleSearch}
          rightIcon={filterIcon}
        />

        <View style={styles.filtersContainer}>
          <FlatList
            horizontal
            data={filterConfigs}
            keyExtractor={(item) => item.id}
            renderItem={renderPickerItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        </View>

        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <AppText text={`Results (${suggestedJobs.length})`} type="primaryHeading" />
            <TouchableOpacity style={styles.arrangeButton} onPress={handleArrangePress}>
              <Image source={arrangeIcon} style={styles.arrangeIcon} contentFit="contain" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={suggestedJobs}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderJobItem}
            contentContainerStyle={styles.listContent}
          />
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
  content: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  filtersContainer: {
    marginBottom: Spacing.lg,
  },
  flatListContent: {
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  pickerItem: {
    minWidth: wp(22),
    marginBottom: Spacing.md,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrangeButton: {
    padding: Spacing.xs,
  },
  arrangeIcon: {
    width: iconSize,
    height: iconSize,
  },
  listContent: {
    paddingBottom: Spacing.xl,
    paddingHorizontal: wp(0.5),
    paddingTop: Spacing.xs,
  },
});

