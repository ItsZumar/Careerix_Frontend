import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import { AppText, ScreenWrapper, AppButton } from "@/components";
import { notificationIcon } from "@/assets/images";
import { wp } from "@/utils";

const ProfileSetupCompleteScreen = () => {
  const params = useLocalSearchParams<{
    title?: string;
    description?: string;
    buttonText?: string;
  }>();

  const title = params.title || "Preferences Saved!";
  const description = params.description || "We've updated your preferences just the way you like them.";
  const buttonText = params.buttonText || "Start Browsing";
  const handleStartBrowsing = () => {
    // Default navigation to the main tabs/home screen
    router.replace("/(tabs)");
  };

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={notificationIcon} style={styles.icon} contentFit="contain" />
          <AppText text={title} type="title" />
          <AppText text={description} type="default" />
        </View>
      </View>

      <AppButton text={buttonText} onPress={handleStartBrowsing} />
    </ScreenWrapper>
  );
};

export default ProfileSetupCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: wp(40),
    height: wp(40),
    marginBottom: Spacing.xl,
  },
});
