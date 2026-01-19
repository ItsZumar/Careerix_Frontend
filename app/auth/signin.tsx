import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router, type Href } from "expo-router";
import { Screens } from "@/enum";
import { SigninI } from "@/interfaces";
import { useFormikHook } from "@/hooks";
import { signinValidationSchema } from "@/utils";
import { colorPalette, LayoutStyles, Spacing } from "@/styles";
import { AppButton, AppLogo, AppText, ScreenWrapper, KeyboardResponsiveHOC, TextInput, SocialButton, Separator } from "@/components";

const SigninScreen = () => {
  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const submit = async ({ email, password }: SigninI) => {
    try {
      Keyboard.dismiss();
      console.log(email, password);
      // TODO: Add API call for signin here
      // After successful signin, navigate to home page
      router.replace("/(tabs)");
    } catch (err) {
      console.log("error === ", err);
    }
  };

  const { handleChange, handleSubmit, setFieldTouched, errors, touched, values } = useFormikHook(submit, validationSchema, initialValues);

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container}>
        <View style={styles.form}>
          <View style={styles.logoContainer}>
            <AppLogo />
            <AppText text="Freedoom" type="label" />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.title}>
              <AppText text="Welcome Back" type="title" />
              <AppText text="Sign in to your account" type="default" />
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
            <TextInput
              placeholder="Enter Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              error={typeof errors.password === "string" ? errors.password : undefined}
              visible={typeof touched.password === "boolean" ? touched.password : undefined}
              secureInput={true}
              leftIcon="lock-closed-outline"
            />

            <AppButton text="Sign In" onPress={handleSubmit} />

            <View style={styles.linkRow}>
              <AppButton 
                text="Create an Account" 
                preset="text" 
                onPress={() => router.push(Screens.Signup as Href)} 
              />

              <AppButton 
                text="Forgot Password?" 
                preset="text" 
                onPress={() => router.push(Screens.ForgotPassword as Href)} 
              />
            </View>

            <Separator text="OR" />

            <SocialButton type="google" onPress={() => console.log("Google login")} />
            <SocialButton type="apple" onPress={() => console.log("Apple login")} />
          </View>
        </View>
      </KeyboardResponsiveHOC>
    </ScreenWrapper>
  );
};

export default SigninScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    paddingTop: Spacing.xxs,
    marginBottom: Spacing.xxl,
  },
  title: {
    paddingVertical: Spacing.md,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: Spacing.xxl + Spacing.xxl,
  },
  form: {
    paddingTop: Spacing.sm,
    justifyContent: "space-between",
  },
  inputContainer: {
    flexGrow: 1,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
