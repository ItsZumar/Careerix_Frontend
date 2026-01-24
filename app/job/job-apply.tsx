"use client";

import React, { useState, useCallback, useMemo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import {
  ScreenWrapper,
  AppHeader,
  AppText,
  AppButton,
  RadioOptionButton,
  Picker,
  TextInput,
  ErrorMessage,
  FileUpload,
} from "@/components";
import { suggestedJobs, vehicleOptions, shiftOptions } from "@/constants";
import { wp, hp } from "@/utils";
import { Screens } from "@/enum";

type OptionValue = boolean;

export default function JobApplyScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const job = useMemo(
    () => suggestedJobs.find((item) => item.id === id),
    [id]
  );

  const [hasExperience, setHasExperience] = useState<OptionValue | null>(null);
  const [isAvailableImmediately, setIsAvailableImmediately] = useState<OptionValue | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [cvFileName, setCvFileName] = useState<string | null>(null);

  // Error states
  const [errors, setErrors] = useState({
    hasExperience: false,
    selectedVehicle: false,
    selectedShift: false,
    isAvailableImmediately: false,
  });

  const validateForm = useCallback(() => {
    const newErrors = {
      hasExperience: hasExperience === null,
      selectedVehicle: selectedVehicle === "",
      selectedShift: selectedShift === "",
      isAvailableImmediately: isAvailableImmediately === null,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  }, [hasExperience, selectedVehicle, selectedShift, isAvailableImmediately]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleApply = useCallback(() => {
    if (validateForm()) {
      // Handle apply logic here
      console.log("Form submitted:", {
        hasExperience,
        selectedVehicle,
        selectedShift,
        isAvailableImmediately,
        description,
      });

      // Navigate to profile setup complete screen
      router.push({
        pathname: Screens.ProfileSetupComplete,
        params: {
          title: "Application Submitted!",
          description: "Your job application has been submitted successfully. We'll review it and get back to you soon.",
          buttonText: "Browse More Jobs",
          icon: "taskDone",
          buttonScreen: Screens.JobSearch,
          secondButtonText: "Go to Dashboard",
          secondButtonPreset: "outline",
          secondButtonScreen: Screens.TabsDashboard,
        },
      });
    }
  }, [validateForm, hasExperience, selectedVehicle, selectedShift, isAvailableImmediately, description]);

  const handleExperienceSelect = useCallback((value: OptionValue) => {
    setHasExperience(value);
    setErrors((prev) => ({ ...prev, hasExperience: false }));
  }, []);

  const handleAvailabilitySelect = useCallback((value: OptionValue) => {
    setIsAvailableImmediately(value);
    setErrors((prev) => ({ ...prev, isAvailableImmediately: false }));
  }, []);

  const handleVehicleChange = useCallback((value: string) => {
    setSelectedVehicle(value);
    setErrors((prev) => ({ ...prev, selectedVehicle: false }));
  }, []);

  const handleShiftChange = useCallback((value: string) => {
    setSelectedShift(value);
    setErrors((prev) => ({ ...prev, selectedShift: false }));
  }, []);

  const handleDescriptionChange = useCallback((text: string) => {
    setDescription(text);
  }, []);

  const handleCvUpload = useCallback(() => {
    // TODO: Implement actual file picker using expo-document-picker
    // For now, simulate file selection
    setCvFileName("resume.pdf");
  }, []);

  const handleRemoveCv = useCallback(() => {
    setCvFileName(null);
  }, []);

  const isFormValid = useMemo(() => {
    return (
      hasExperience !== null &&
      selectedVehicle !== "" &&
      selectedShift !== "" &&
      isAvailableImmediately !== null
    );
  }, [hasExperience, selectedVehicle, selectedShift, isAvailableImmediately]);

  if (!job) {
    return (
      <ScreenWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
        <AppHeader title="Apply" showBackButton onBackPress={handleBack} />
        <View style={styles.notFoundContainer}>
          <AppText text="Job not found." type="description" />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper style={[LayoutStyles.horizontalSpacing, styles.container]}>
      <AppHeader title="Apply" showBackButton onBackPress={handleBack} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          <AppText
            text="Applying for"
            type="description"
            style={styles.companyName}
          />
          <AppText
            text={job.jobTitle}
            type="primaryHeading"
            style={styles.jobTitle}
          />
        </View>

        <View style={styles.questionContainer}>
          <AppText
            text="Do you have prior experience in as Delivery man?"
            type="description"
            style={styles.questionText}
          />
          <View style={styles.optionsContainer}>
            <RadioOptionButton
              label="Yes"
              value={true}
              selectedValue={hasExperience}
              onPress={handleExperienceSelect}
            />
            <RadioOptionButton
              label="No"
              value={false}
              selectedValue={hasExperience}
              onPress={handleExperienceSelect}
            />
          </View>
          {errors.hasExperience && (
            <ErrorMessage error="Please select an option" visible={errors.hasExperience} />
          )}
        </View>

        <View style={styles.questionContainer}>
          <AppText
            text="Do you have a vehicle?"
            type="description"
            style={styles.questionText}
          />
          <Picker
            placeholder="Select vehicle"
            options={vehicleOptions}
            value={selectedVehicle}
            onValueChange={handleVehicleChange}
            containerStyle={styles.pickerContainer}
            error={errors.selectedVehicle ? "Please select a vehicle" : undefined}
            visible={errors.selectedVehicle}
          />
        </View>

        <View style={styles.questionContainer}>
          <AppText
            text="What shifts are you available for?"
            type="description"
            style={styles.questionText}
          />
          <Picker
            placeholder="Select shift"
            options={shiftOptions}
            value={selectedShift}
            onValueChange={handleShiftChange}
            containerStyle={styles.pickerContainer}
            error={errors.selectedShift ? "Please select a shift" : undefined}
            visible={errors.selectedShift}
          />
        </View>

        <View style={styles.questionContainer}>
          <AppText
            text="Are you available to start immediately?"
            type="description"
            style={styles.questionText}
          />
          <View style={styles.optionsContainer}>
            <RadioOptionButton
              label="Yes"
              value={true}
              selectedValue={isAvailableImmediately}
              onPress={handleAvailabilitySelect}
            />
            <RadioOptionButton
              label="No"
              value={false}
              selectedValue={isAvailableImmediately}
              onPress={handleAvailabilitySelect}
            />
          </View>
          {errors.isAvailableImmediately && (
            <ErrorMessage error="Please select an option" visible={errors.isAvailableImmediately} />
          )}
        </View>

        <View style={styles.questionContainer}>
          <AppText
            text="Write Description"
            type="description"
            style={styles.questionText}
          />
          <TextInput
            placeholder="Enter your description here..."
            value={description}
            onChangeText={handleDescriptionChange}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            containerStyle={styles.descriptionContainer}
            inputStyle={styles.descriptionInput}
          />
        </View>

        <View style={styles.questionContainer}>
          <AppText
            text="Upload CV"
            type="description"
            style={styles.questionText}
          />
          <FileUpload
            fileName={cvFileName}
            onUpload={handleCvUpload}
            onRemove={handleRemoveCv}
            placeholder="Choose File"
          />
        </View>
      </ScrollView>

      <View style={styles.applyButtonContainer}>
        <AppButton
          text="Submit"
          onPress={handleApply}
          disabled={!isFormValid}
        />
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
  scrollView: {
    flex: 1,
  },
  content: {
    backgroundColor: colorPalette.primaryBg.tertiary,
    padding: Spacing.md,
    borderRadius: wp(4),
    marginBottom: Spacing.sm,
  },
  jobTitle: {
    marginBottom: Spacing.xs,
  },
  companyName: {
    color: colorPalette.primaryBg.secondaryGrey,
    marginBottom: Spacing.xxs,
  },
  applyButtonContainer: {
    paddingBottom: Spacing.lg,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  questionContainer: {
    marginTop: Spacing.md,
  },
  questionText: {
    marginBottom: Spacing.xs,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  pickerContainer: {
    marginTop: Spacing.xs,
  },
  descriptionContainer: {
    marginTop: Spacing.xs,
  },
  descriptionInput: {
    minHeight: hp(15),
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
});
