import React from "react";
import { ImageStyle, StyleProp, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { wp } from "@/utils";

interface AppLogoI {
  style?: StyleProp<ImageStyle>;
}

export const AppLogo = ({ style }: AppLogoI) => {
  return <Image source={require("../../assets/logo.png")} style={[styles.logo, style]} contentFit="contain" />;
};

const styles = StyleSheet.create({
  logo: {
    width: wp(10),
    height: wp(10),
    alignSelf: "center",
  },
});
