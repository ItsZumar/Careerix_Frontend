import React, { useState } from "react";
import { View, StyleSheet, Keyboard, ScrollView } from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import { wp, hp } from "@/utils";
import { Screens } from "@/enum";
import { profileImage } from "@/assets";
import { ProfileSetupI } from "@/interfaces";
import { useFormikHook } from "@/hooks";
import { profileSetupValidationSchema } from "@/utils";
import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import {  JOB_CATEGORIES, profileTextInputFields, profilePickerFields, WORK_LOCATION_OPTIONS } from "@/constants";
import { AppText, ScreenWrapper, KeyboardResponsiveHOC, CircleButton, TextInput, Picker, AppButton, EditProfileImageButton, SearchBar, SelectableChip } from "@/components";

const ProfileSetupScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedJobCategories, setSelectedJobCategories] = useState<string[]>([]);
  const [selectedWorkLocations, setSelectedWorkLocations] = useState<string[]>([]);

  const validationSchema = profileSetupValidationSchema;
  const initialValues: ProfileSetupI = { name: "", phoneNumber: "", genderIdentity: "", roles: "" };

  const submit = async ({ name, phoneNumber, genderIdentity, roles }: ProfileSetupI) => {
    try {
      Keyboard.dismiss();
      const profileData = {
        name,
        phoneNumber,
        genderIdentity,
        roles,
        jobCategories: selectedJobCategories,
        workLocations: selectedWorkLocations,
      };
      console.log("Profile setup data:", profileData);
      // TODO: Add API call for profile setup here
      // After successful submission, navigate to next screen
      router.replace({
        pathname: Screens.ProfileSetupComplete,
        params: {
          title: "Preferences Saved!",
          description: "We've updated your preferences just the way you like them.",
          buttonText: "Start Browsing",
          icon: "notification",
        },
      });
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, setFieldValue } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  const handleContinue = async () => {
    Keyboard.dismiss();
    
    if (currentStep === 1) {
      setFieldTouched("name");
      setFieldTouched("phoneNumber");
      setFieldTouched("genderIdentity");
      setFieldTouched("roles");
      
      const isFormValid = 
        values.name && 
        values.phoneNumber && 
        values.genderIdentity && 
        values.roles &&
        !errors.name &&
        !errors.phoneNumber &&
        !errors.genderIdentity &&
        !errors.roles;
      
      if (isFormValid) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      await submit(values);
      router.replace({
        pathname: Screens.ProfileSetupComplete,
        params: {
          title: "Preferences Saved!",
          description: "We've updated your preferences just the way you like them.",
          buttonText: "Start Browsing",
          icon: "notification",
        },
      });
    }
  };

  const handleSkip = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const toggleJobCategorySelection = (item: string) => {
    setSelectedJobCategories((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const toggleWorkLocationSelection = (item: string) => {
    setSelectedWorkLocations((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const getFieldError = (fieldName: keyof ProfileSetupI): string | undefined => {
    const error = errors[fieldName];
    return typeof error === "string" ? error : undefined;
  };

  const getFieldTouched = (fieldName: keyof ProfileSetupI): boolean | undefined => {
    const touchedField = touched[fieldName];
    return typeof touchedField === "boolean" ? touchedField : undefined;
  };

  const pickerFieldsWithStyles = profilePickerFields.map((field, index) => ({
    ...field,
    containerStyle: index === 0 ? styles.genderPickerContainer : styles.rolesPickerContainer,
  }));

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <View style={styles.titleContainer}>
              <AppText text="Profile Setup" type="title" />
              <AppText text="Setup to unlock better job matches!" type="default" />
            </View>

            <View style={styles.imageContainer}>
              <Image source={profileImage} style={styles.profileImage} contentFit="cover" />
              <EditProfileImageButton onPress={() => console.log("Edit profile image")} />
            </View>

            <View style={styles.formContainerStep1}>
              {profileTextInputFields.map((field) => (
                <TextInput
                  key={field.name}
                  placeholder={field.placeholder}
                  value={values[field.name]}
                  onChangeText={handleChange(field.name)}
                  onBlur={() => setFieldTouched(field.name)}
                  error={getFieldError(field.name)}
                  visible={getFieldTouched(field.name)}
                  leftIcon={field.leftIcon}
                  keyboardType={field.keyboardType}
                />
              ))}
              <View style={styles.pickersRow}>
                {pickerFieldsWithStyles.map((field) => (
                  <View key={field.name} style={field.containerStyle}>
                    <Picker
                      placeholder={field.placeholder}
                      options={field.options}
                      value={values[field.name]}
                      onValueChange={(value) => setFieldValue(field.name, value)}
                      onBlur={() => setFieldTouched(field.name)}
                      error={getFieldError(field.name)}
                      visible={getFieldTouched(field.name)}
                    />
                  </View>
                ))}
              </View>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.titleContainer}>
              <AppText text="Skills and Experience?" type="title" />
              <AppText text="Tell us what works for you!" type="default" />
            </View>

            <SearchBar
              placeholder="Search by Job name"
              leftIcon="search-outline"
            />

            <View style={styles.formContainer}>
              {JOB_CATEGORIES.map((category) => (
                <SelectableChip
                  key={category}
                  label={category}
                  selected={selectedJobCategories.includes(category)}
                  onPress={() => toggleJobCategorySelection(category)}
                />
              ))}
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.titleContainer}>
              <AppText text="Your Work Interest" type="title" />
              <AppText text="Tell us where you’d like to work!" type="default" />
            </View>

            <SearchBar
              placeholder="Choose Locations"
              leftIcon="search-outline"
            />

            <View style={styles.formContainer}>
              {WORK_LOCATION_OPTIONS.map((location) => (
                <SelectableChip
                  key={location}
                  label={location}
                  selected={selectedWorkLocations.includes(location)}
                  onPress={() => toggleWorkLocationSelection(location)}
                />
              ))}
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container}>

        <View style={styles.headerContainer}>
          <CircleButton onPress={handleBack} />
          <View style={styles.progressContainer}>
            {[1, 2, 3].map((step) => (
              <View
                key={step}
                style={[
                  styles.progressDot,
                  currentStep === step && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <ScrollView 
          style={styles.content} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          
          {renderStepContent()}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <AppButton text="Continue" onPress={handleContinue} />
          {currentStep < 3 && (
            <AppButton text="Skip for now" preset="text" onPress={handleSkip} />
          )}
        </View>
      </KeyboardResponsiveHOC>
    </ScreenWrapper>
  );
};

export default ProfileSetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  content: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xl,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    marginBottom: Spacing.xxl,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  profileImage: {
    width: wp(33),
    height: wp(33),
    borderRadius: wp(17),
    backgroundColor: colorPalette.primaryBg.primaryGrey,
  },
  formContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: Spacing.xs,
  },
  formContainerStep1: {
    flex: 1,
  },
  pickersRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  genderPickerContainer: {
    flex: 2,
  },
  rolesPickerContainer: {
    flex: 3,
  },
  buttonContainer: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  progressDot: {
    width: wp(23),
    height: hp(1),
    borderRadius: wp(5),
    backgroundColor: colorPalette.primaryBg.primaryGrey,
  },
  progressDotActive: {
    width: wp(23),
    backgroundColor: colorPalette.primaryBg.primaryBlack,
  },
});
