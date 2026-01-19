import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router, type Href } from "expo-router";
import { Screens } from "@/enum";
import { useFormikHook } from "@/hooks";
import { forgotPasswordValidationSchema, hp } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppText, ScreenWrapper, KeyboardResponsiveHOC, TextInput, BackButton, SocialButton, Separator } from "@/components";
import { wp } from "@/utils";

interface ForgotPasswordI {
  email: string;
}

const ForgotPasswordScreen = () => {
  const validationSchema = forgotPasswordValidationSchema;
  const initialValues: ForgotPasswordI = { email: "" };

  const submit = async ({ email }: ForgotPasswordI) => {
    try {
      Keyboard.dismiss();
      console.log("Reset password for:", email);
      // TODO: Add API call for forgot password here
      // After successful request, navigate to verification screen
      router.push(Screens.Verification as Href);
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(submit, validationSchema, initialValues);

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container}>
        <View style={styles.form}>

          <View style={styles.headerContainer}>
            <BackButton />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.title}>
              <AppText text="Forgot Password" type="title" />
              <AppText text="Enter your email address to reset your password" type="default" style={styles.description} />
            </View>

            <TextInput
              placeholder="Enter Email Address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              error={typeof errors.email === "string" ? errors.email : undefined}
              visible={typeof touched.email === "boolean" ? touched.email : undefined}
              leftIcon="mail-outline"
            />

            <AppButton text="Send OTP" onPress={handleSubmit} />
            
            <Separator text="OR" />

            <SocialButton type="google" onPress={() => console.log("Google login")} />
            <SocialButton type="apple" onPress={() => console.log("Apple login")} />
          </View>
        </View>
      </KeyboardResponsiveHOC>
    </ScreenWrapper>
  );
};

export default ForgotPasswordScreen;

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
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
