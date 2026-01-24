import { useFonts as useExpoFonts } from "expo-font";

export enum AppFont {
  regular = "Mulish-Regular",
  medium = "Mulish-Medium",
  bold = "Mulish-Bold",
  semiBold = "Mulish-SemiBold",
  light = "Mulish-Light",
  extraLight = "Mulish-ExtraLight",
  extraBold = "Mulish-ExtraBold",
  black = "Mulish-Black",
}

export const useFonts = () => {
  const [fontsLoaded, fontError] = useExpoFonts({
    [AppFont.regular]: require("../assets/fonts/Mulish-Regular.ttf"),
    [AppFont.medium]: require("../assets/fonts/Mulish-Medium.ttf"),
    [AppFont.bold]: require("../assets/fonts/Mulish-Bold.ttf"),
    [AppFont.semiBold]: require("../assets/fonts/Mulish-SemiBold.ttf"),
    [AppFont.light]: require("../assets/fonts/Mulish-Light.ttf"),
    [AppFont.extraLight]: require("../assets/fonts/Mulish-ExtraLight.ttf"),
    [AppFont.extraBold]: require("../assets/fonts/Mulish-ExtraBold.ttf"),
    [AppFont.black]: require("../assets/fonts/Mulish-Black.ttf"),
  });

  return { fontsLoaded, fontError };
};
