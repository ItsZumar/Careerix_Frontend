import React, { useMemo } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { wp, hp } from "@/utils";
import { Screens } from "@/enum";
import { useFormikHook } from "@/hooks";
import { createNewPasswordValidationSchema } from "@/utils";
import { colorPalette, LayoutStyles, Spacing, iconSize } from "@/styles";
import { AppButton, AppText, ScreenWrapper, KeyboardResponsiveHOC, TextInput, BackButton } from "@/components";

interface CreateNewPasswordI {
  password: string;
  confirmPassword: string;
}

const CreateNewPasswordScreen = () => {
  const validationSchema = createNewPasswordValidationSchema;
  const initialValues: CreateNewPasswordI = { password: "", confirmPassword: "" };

  const submit = async ({ password }: CreateNewPasswordI) => {
    try {
      Keyboard.dismiss();
      console.log("New password:", password);
      // TODO: Add API call for password reset here
      // After successful password reset, navigate to complete screen
      router.replace({
        pathname: Screens.ProfileSetupComplete,
        params: {
          title: "Password Changed!",
          description: "You're all set! Your account is now secure with your new password.",
          buttonText: "Start Browsing",
          icon: "passwordChanged",
        },
      });
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(submit, validationSchema, initialValues);

  const getFieldError = (fieldName: keyof CreateNewPasswordI): string | undefined => {
    const error = errors[fieldName];
    return typeof error === "string" ? error : undefined;
  };

  const getFieldTouched = (fieldName: keyof CreateNewPasswordI): boolean | undefined => {
    const touchedField = touched[fieldName];
    return typeof touchedField === "boolean" ? touchedField : undefined;
  };

  const passwordValidation = useMemo(() => {
    const password = values.password;
    return {
      minLength: password.length >= 8,
      hasNumber: /[1-9]/.test(password),
      hasLetter: /[a-zA-Z]/.test(password),
    };
  }, [values.password]);

  const renderValidationItem = (isValid: boolean, text: string) => (
    <View style={styles.validationItem}>
      <Ionicons
        name={isValid ? "checkmark-circle" : "close-circle"}
        size={iconSize * 0.8}
        color={isValid ? "#22C55E" : colorPalette.primaryBg.primaryRed}
      />
      <AppText text={text} type="default" style={[styles.validationText, isValid ? styles.validationTextValid : styles.validationTextInvalid]} />
    </View>
  );

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container}>
        <View style={styles.form}>
          <View style={styles.headerContainer}>
            <BackButton />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.title}>
              <AppText text="Create New Password" type="title" />
              <AppText text="Your new password must be different from previously used passwords" type="default" style={styles.description} />
            </View>

            <TextInput
              placeholder="Enter New Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              // error={getFieldError("password")}
              visible={getFieldTouched("password")}
              secureInput={true}
              leftIcon="lock-closed-outline"
            />
            <TextInput
              placeholder="Confirm New Password"
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={() => setFieldTouched("confirmPassword")}
              // error={getFieldError("confirmPassword")}
              visible={getFieldTouched("confirmPassword")}
              secureInput={true}
              leftIcon="lock-closed-outline"
            />

            <View style={styles.validationContainer}>
              {renderValidationItem(passwordValidation.minLength, "Minimum 8 characters")}
              {renderValidationItem(passwordValidation.hasNumber, "At least 1 number (1-9)")}
              {renderValidationItem(passwordValidation.hasLetter, "At least lowercase or uppercase letters")}
            </View>

            <AppButton text="Set Password" onPress={handleSubmit} />
          </View>
        </View>
      </KeyboardResponsiveHOC>
    </ScreenWrapper>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  headerContainer: {
    alignItems: "flex-start",
  },
  title: {
    paddingVertical: Spacing.md,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: Spacing.xxl + Spacing.xxl,
    width: wp(70),
  },
  description: {
    textAlign: "center",
    paddingVertical: hp(1.5),
  },
  form: {
    paddingTop: Spacing.sm,
    justifyContent: "space-between",
  },
  inputContainer: {
    flexGrow: 1,
    paddingTop: Spacing.xxl,
  },
  validationContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    paddingLeft: Spacing.xs,
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.xs,
    gap: Spacing.xs,
  },
  validationText: {
    fontSize: 12,
  },
  validationTextValid: {
    color: "#22C55E",
  },
  validationTextInvalid: {
    color: colorPalette.primaryBg.primaryRed,
  },
});
