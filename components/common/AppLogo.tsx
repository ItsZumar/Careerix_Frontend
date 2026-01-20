import React from "react";
import { ImageStyle, StyleProp, StyleSheet } from "react-native";
import { Image } from "expo-image";

import { wp } from "@/utils";
import { logo } from "@/assets";

interface AppLogoI {
  style?: StyleProp<ImageStyle>;
}

export const AppLogo = ({ style }: AppLogoI) => {
  return <Image source={logo} style={[styles.logo, style]} contentFit="contain" />;
};

const styles = StyleSheet.create({
  logo: {
    width: wp(10),
    height: wp(10),
    alignSelf: "center",
  },
});
