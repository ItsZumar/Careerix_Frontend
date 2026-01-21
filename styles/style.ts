import { StyleSheet } from "react-native";
import { FontsType } from "../interfaces";
import { AppFont } from "@/utils/fonts";
import { hp, wp } from "@/utils/responsive";

export const colorPalette = {
  primaryBg: {
    primaryOrange: "#FF6600",
    primaryBlack: "#000000",
    primaryGrey: "#F5F5F4",
    secondaryGrey: "#A8A29D",
    darkGrey: "#44403C",

    quinary: "#79716B",
    tertiary: "#FAFAF9",
    primary: "#1C1917",

    primaryWhite: "#ffffff",
    primaryRed: "#FD2828FF",

    transparent: "rgba(0,0,0,0)",
    transparentWhite: "rgba(255,255,255,0.8)",
    orangeWithOpacity: "rgba(255, 102, 0, 0.1)",
  },
};

export const Spacing = {
  xxs: hp(0.5),
  xs: hp(1),
  sm: hp(1.5),
  md: hp(2),
  smd: hp(2.5),
  lg: hp(3),
  xl: hp(5),
  xxl: hp(6),
};

export const Fonts: FontsType = {
  size: {
    xs: hp(1.65),
    sm: hp(1.93),
    md: hp(2.2),
    lg: hp(2.28),
    xl: hp(2.5),
    xxl: hp(3.03),
    heading: hp(4),
    display: hp(3.4),
  },
  weight: {
    xs: "200",
    sm: "300",
    md: "400",
    lg: "600",
    xl: "700",
    xxl: "bold",
    heading: "bold",
    display: "bold",
  },
};

export const Typography = StyleSheet.create({
  default: {
    fontSize: Fonts.size.sm,
    color: colorPalette.primaryBg.primaryBlack,
    fontFamily: AppFont.regular,
  },
  label: {
    fontSize: Fonts.size.md,
    fontWeight: Fonts.weight.xl,
    letterSpacing: 0.1,
    color: colorPalette.primaryBg.primaryBlack,
  },

  title: {
    fontSize: Fonts.size.display,
    color: colorPalette.primaryBg.primaryBlack,
    fontFamily: AppFont.bold,
  },
  primaryTitle: {
    fontSize: Fonts.size.heading,
    color: colorPalette.primaryBg.primaryBlack,
    fontFamily: AppFont.bold,
  },
  
  heading: {
    fontSize: Fonts.size.xl,
    letterSpacing: 0.1,
    color: colorPalette.primaryBg.primaryBlack,
    fontFamily: AppFont.semiBold,
  },
  primaryHeading: {
    fontSize: Fonts.size.md,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryBlack,
  },
  regularSubHeading: {
    fontSize: Fonts.size.sm,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryBlack,
  },
  subHeading: {
    fontSize: Fonts.size.sm,
    color: colorPalette.primaryBg.primaryBlack,
    fontFamily: AppFont.semiBold,
  },
  description: {
    fontSize: Fonts.size.xs,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryBlack,
  },
  detail: {
    fontSize: Fonts.size.lg,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryBlack,
  },
  buttonTitle: {
    fontSize: Fonts.size.lg,
    color: colorPalette.primaryBg.primaryBlack,
    fontFamily: AppFont.bold,
  },
  errorText: {
    fontSize: Fonts.size.sm,
    fontFamily: AppFont.regular,
    color: colorPalette.primaryBg.primaryRed,
  },
});

export const iconSize = wp(5);

export const GRADIENT_COLORS = ["#FF8533", colorPalette.primaryBg.primaryOrange] as const;

export const FormsStyle = StyleSheet.create({
  formControl: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.md,
    borderRadius: wp(10),
    borderWidth: wp(0.2),
    color: colorPalette.primaryBg.primaryBlack,
    borderColor: colorPalette.primaryBg.primaryGrey,
    fontFamily: AppFont.regular,
  },
  formLabel: {
    marginVertical: Spacing.xs,
  },
});

export const LayoutStyles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingTop: Spacing.lg,
  },
  headerNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: Spacing.sm,
  },
  headerIcon: {
    color: colorPalette.primaryBg.primaryWhite,
    resizeMode: "contain",
  },
  cardIcon: {
    width: wp(6.5),
    height: wp(6.5),
  },
  horizontalSpacing: {
    paddingHorizontal: Spacing.lg,
  },
  positionCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
});
