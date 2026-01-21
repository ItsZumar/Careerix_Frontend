import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams, Href } from "expo-router";

import { wp } from "@/utils";
import { Screens } from "@/enum";
import { AppText, ScreenWrapper, AppButton } from "@/components";
import { LayoutStyles, Spacing, colorPalette } from "@/styles";
import { notificationIcon, passwordChangedIcon } from "@/assets";

const ICON_SIZE = wp(50);

const iconMap: Record<string, any> = {
  notification: notificationIcon,
  passwordChanged: passwordChangedIcon,
};

const ProfileSetupCompleteScreen = () => {
  const params = useLocalSearchParams<{
    title?: string;
    description?: string;
    buttonText?: string;
    icon?: string;
  }>();

  const title = params.title || "Preferences Saved!";
  const description = params.description || "We've updated your preferences just the way you like them.";
  const buttonText = params.buttonText || "Start Browsing";
  const iconSource = params.icon ? iconMap[params.icon] || notificationIcon : notificationIcon;
  
  const handleStartBrowsing = () => {
    router.push(Screens.TabsRoot as Href);
  };

  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={iconSource} style={styles.icon} contentFit="contain" />
          <AppText text={title} type="title" />
          <AppText text={description} type="default" style={styles.description} />
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
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginBottom: Spacing.md,
  },
  description: {
    textAlign: "center",
  },
});
