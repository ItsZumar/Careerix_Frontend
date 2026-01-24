import React from "react";
import { TouchableOpacity, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colorPalette, Spacing } from "@/styles";
import { AppText } from "../common/AppText";
import { wp } from "@/utils";
import { googleIcon } from "@/assets";

interface SocialButtonProps {
  type: "google" | "apple";
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const SocialButton = ({ type, onPress, style }: SocialButtonProps) => {
  const getButtonText = () => {
    return type === "google" ? "Continue with Google" : "Continue with Apple";
  };

  const renderIcon = () => {
    if (type === "google") {
      return (
        <Image
          source={googleIcon}
          style={styles.googleLogo}
          contentFit="contain"
        />
      );
    } else {
      return <Ionicons name="logo-apple" size={20} color={colorPalette.primaryBg.primaryBlack} />;
    }
  };

  return (
    <TouchableOpacity style={[styles.socialButton, style]} onPress={onPress}>
      <View style={styles.socialButtonContent}>
        {renderIcon()}
        <AppText text={getButtonText()} type="default" style={styles.socialButtonText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: colorPalette.primaryBg.tertiary,
    borderRadius: wp(10),
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  googleLogo: {
    width: wp(5),
    height: wp(5),
  },
  socialButtonText: {
    color: colorPalette.primaryBg.primaryBlack,
  },
});
