import React from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { router, type Href } from "expo-router";
import { Screens } from "@/enum";
import { useFormikHook } from "@/hooks/useFormik";
import { signinValidationSchema } from "@/utils/validations";
import { LayoutStyles, Spacing } from "../../styles";
import { AppButton, AppLogo, AppText, ScreenWrapper, KeyboardResponsiveHOC, TextInput } from "@/components";

interface SigninI {
  email: string;
  password: string;
}

const SigninScreen = () => {
  const validationSchema = signinValidationSchema;
  const initialValues: SigninI = { email: "", password: "" };

  const submit = async ({ email, password }: SigninI) => {
    try {
      Keyboard.dismiss();
      console.log(email, password);
      // TODO: Add signin logic here
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
              <AppText text="Sign in to your account" type="label" />
            </View>

            <TextInput
              placeholder="Enter Your Email Address"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              error={typeof errors.email === "string" ? errors.email : undefined}
              visible={typeof touched.email === "boolean" ? touched.email : undefined}
            />
            <TextInput
              placeholder="Enter Your Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => setFieldTouched("password")}
              error={typeof errors.password === "string" ? errors.password : undefined}
              visible={typeof touched.password === "boolean" ? touched.password : undefined}
              secureInput={true}
            />

            <AppButton text="Sign In" onPress={handleSubmit} />

            <View style={styles.linkRow}>
              <AppText text="Don't have an account?" type="label" />
              <AppButton text="Sign Up" onPress={() => router.push(Screens.Signup as Href)} preset="primaryLink" />
            </View>
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
    backgroundColor: "#ffffff",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  title: {
    paddingVertical: Spacing.md,
    alignSelf: "center",
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
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    marginTop: Spacing.md,
  },
});
