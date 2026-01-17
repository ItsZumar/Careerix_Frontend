import React from "react";
import { View, StyleSheet, Keyboard, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import { AppText, ScreenWrapper, KeyboardResponsiveHOC, BackButton, TextInput, Picker, AppButton, EditProfileImageButton } from "@/components";
import { wp } from "@/utils";
import { profileImage } from "@/assets/images";
import { ProfileSetupI } from "@/interfaces";
import { useFormikHook } from "@/hooks";
import { profileSetupValidationSchema } from "@/utils";
import { genderOptions, rolesOptions } from "@/constants";

const ProfileSetupScreen = () => {
  const validationSchema = profileSetupValidationSchema;
  const initialValues: ProfileSetupI = { name: "", phoneNumber: "", genderIdentity: "", roles: "" };

  const submit = async ({ name, phoneNumber, genderIdentity, roles }: ProfileSetupI) => {
    try {
      Keyboard.dismiss();
      console.log({ name, phoneNumber, genderIdentity });
      // TODO: Add API call for profile setup here
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values, setFieldValue } = useFormikHook(
    submit,
    validationSchema,
    initialValues
  );

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container}>
        <BackButton />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.titleContainer}>
            <AppText text="Profile Setup" type="title" />
            <AppText text="Setup to unlock better job matches!" type="default" />
          </View>

          <View style={styles.imageContainer}>
            <Image source={profileImage} style={styles.profileImage} contentFit="cover" />
            <EditProfileImageButton onPress={() => console.log("Edit profile image")} />
          </View>

          <View style={styles.formContainer}>
            <TextInput
              placeholder="Enter Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("name")}
              error={typeof errors.name === "string" ? errors.name : undefined}
              visible={typeof touched.name === "boolean" ? touched.name : undefined}
              leftIcon="person-outline"
            />
            <TextInput
              placeholder="Enter Phone Number"
              value={values.phoneNumber}
              onChangeText={handleChange("phoneNumber")}
              onBlur={() => setFieldTouched("phoneNumber")}
              error={typeof errors.phoneNumber === "string" ? errors.phoneNumber : undefined}
              visible={typeof touched.phoneNumber === "boolean" ? touched.phoneNumber : undefined}
              leftIcon="call-outline"
              keyboardType="phone-pad"
            />
            <View style={styles.pickersRow}>
              <View style={styles.genderPickerContainer}>
                <Picker
                  placeholder="Gender"
                  options={genderOptions}
                  value={values.genderIdentity}
                  onValueChange={(value) => setFieldValue("genderIdentity", value)}
                  onBlur={() => setFieldTouched("genderIdentity")}
                  error={typeof errors.genderIdentity === "string" ? errors.genderIdentity : undefined}
                  visible={typeof touched.genderIdentity === "boolean" ? touched.genderIdentity : undefined}
                />
              </View>
              <View style={styles.rolesPickerContainer}>
                <Picker
                  placeholder="Role"
                  options={rolesOptions}
                  value={values.roles}
                  onValueChange={(value) => setFieldValue("roles", value)}
                  onBlur={() => setFieldTouched("roles")}
                  error={typeof errors.roles === "string" ? errors.roles : undefined}
                  visible={typeof touched.roles === "boolean" ? touched.roles : undefined}
                />
              </View>
            </View>
           
            <AppButton text="Continue" onPress={handleSubmit} />
          </View>
        </ScrollView>
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
    paddingTop: Spacing.xxl + Spacing.xxl,
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
});
