import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Keyboard, NativeSyntheticEvent } from "react-native";
import { router, type Href } from "expo-router";

import { wp } from "@/utils";
import { Screens } from "@/enum";
import { LayoutStyles, Spacing, colorPalette, Fonts } from "@/styles";
import { AppButton, AppText, ScreenWrapper, KeyboardResponsiveHOC, Separator, SocialButton, BackButton } from "@/components";

type OtpArray = [string, string, string, string];

const VerificationScreen = () => {
  const [otp, setOtp] = useState<OtpArray>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(43); 
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (text: string, index: number): void => {
    if (text.length > 1) {
      // Handle paste
      const pastedOtp = text.slice(0, 4).split("");
      const newOtp: OtpArray = [...otp] as OtpArray;
      pastedOtp.forEach((char, i) => {
        if (index + i < 4) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      // Focus on last input
      if (index + pastedOtp.length < 4) {
        inputRefs.current[index + pastedOtp.length]?.focus();
      }
      return;
    }

    const newOtp: OtpArray = [...otp] as OtpArray;
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: NativeSyntheticEvent<{ key: string }>, index: number): void => {
    const key = event.nativeEvent.key;
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = (): void => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
      // TODO: Resend OTP logic
    }
  };

  const handleContinue = (): void => {
    Keyboard.dismiss();
    const otpCode: string = otp.join("");
    if (otpCode.length === 4) {
      console.log("OTP:", otpCode);
      // TODO: Verify OTP logic
      // After successful verification, navigate to profile setup
      router.push(Screens.CreateNewPassword as Href);

      // router.push(Screens.ProfileSetup as Href);
    }
  };

  const formatTimer = (seconds: number): string => {
    const mins: number = Math.floor(seconds / 60);
    const secs: number = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <KeyboardResponsiveHOC containerStyle={styles.container}>
      <View style={styles.headerContainer}>
            <BackButton />
          </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <AppText text="Email Verification" type="title" />
            <AppText text="OTP has sent to example@gmail.com" type="default"  />
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <View style={styles.resendContainer}>
            {!canResend ? (
              <AppText text={formatTimer(timer)} type="default" style={styles.timer} />
            ) : null}
            <TouchableOpacity onPress={handleResend} disabled={!canResend}>
              <AppText text="Resend" type="default" style={[styles.resendText, canResend && styles.resendActive]} />
            </TouchableOpacity>
          </View>

          <AppButton text="Continue" onPress={handleContinue} />

          <Separator text="OR" />


          <SocialButton type="google" onPress={() => console.log("Google login")} />
          <SocialButton type="apple" onPress={() => console.log("Apple login")} />
        </View>
      </KeyboardResponsiveHOC>
    </ScreenWrapper>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    paddingTop: Spacing.xxl + Spacing.xxl,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: Spacing.xxl,
    gap: Spacing.xxs,
  },
  subtitle: {
    marginTop: Spacing.sm,
    color: colorPalette.primaryBg.secondaryGrey,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  otpInput: {
    width: wp(15),
    height: wp(15),
    borderWidth: 1,
    borderColor: colorPalette.primaryBg.primaryGrey,
    borderRadius: wp(3),
    textAlign: "center",
    fontSize: Fonts.size.xl,
    fontFamily: "Mulish-Bold",
    color: colorPalette.primaryBg.primaryBlack,
    backgroundColor: "#ffffff",
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.xxl + Spacing.xxl + Spacing.xxl,
  },
  timer: {
    color: colorPalette.primaryBg.primaryRed,
  },
  resendText: {
    color: colorPalette.primaryBg.secondaryGrey,
  },
  resendActive: {
    color: colorPalette.primaryBg.primaryRed,
  },
});
