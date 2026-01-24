import React from "react";
import { StyleProp, ImageStyle } from "react-native";
import { Image } from "expo-image";

interface TabIconProps {
  source: any;
  color: string;
  size: number;
  style?: StyleProp<ImageStyle>;
}

export const TabIcon = ({ source, color, size, style }: TabIconProps) => {
  return (
    <Image
      source={source}
      style={[{ width: size, height: size, tintColor: color }, style]}
    />
  );
};
