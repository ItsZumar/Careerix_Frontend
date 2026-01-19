import React, { ComponentType } from "react";
import { PressableProps, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppFont, hp } from "@/utils";
import { colorPalette, Fonts, Spacing } from "@/styles";
import { AppText } from "./AppText";
import { RippleWrapper } from "../layout/RippleWrapper";

type Presets = keyof typeof viewPresets;

interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
}

interface ButtonProps extends PressableProps {
  text: string;
  preset?: Presets;
  style?: StyleProp<ViewStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  onPress: () => void;
}

export function AppButton(props: ButtonProps) {
  const {
    text,
    style,
    pressedStyle,
    textStyle,
    pressedTextStyle,
    RightAccessory,
    LeftAccessory,
    onPress,
    preset = "default",
    ...rest
  } = props;

  const getContainerStyle = () => containerPresets[preset];

  const getViewStyle = () => [viewPresets[preset], style];

  const getTextStyle = () => [textPresets[preset], textStyle];

  const buttonContent = (
    <>
      {LeftAccessory && <LeftAccessory style={leftAccessoryStyle} />}
      <AppText text={text} style={getTextStyle()} type="buttonTitle" />
      {RightAccessory && <RightAccessory style={rightAccessoryStyle} />}
    </>
  );

  const isGradientPreset = preset === "default" || preset === "filled";

  return (
    <RippleWrapper
      onPress={onPress}
      style={isGradientPreset ? undefined : getViewStyle()}
      rippleColor={isGradientPreset ? colorPalette.primaryBg.primaryOrange : colorPalette.primaryBg.transparent}
      containerStyle={getContainerStyle()}
    >
      {isGradientPreset ? (
        <LinearGradient
          colors={["#FF8533", colorPalette.primaryBg.primaryOrange]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[baseViewStyle, preset === "default" ? { borderWidth: 1, borderColor: colorPalette.primaryBg.primaryOrange } : {}, style]}
        >
          {buttonContent}
        </LinearGradient>
      ) : (
        <View style={getViewStyle()}>{buttonContent}</View>
      )}
    </RippleWrapper>
  );
}

const baseViewStyle: ViewStyle = {
  flexDirection: "row",
  alignSelf: "stretch",
  borderRadius: hp(2.5),
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: Spacing.sm,
  overflow: "hidden",
};

const baseTextStyle: TextStyle = {
  color: colorPalette.primaryBg.primaryOrange,
  textAlign: "center",
  fontFamily: AppFont.bold,
};

const rightAccessoryStyle: ViewStyle = { marginStart: Spacing.xs, zIndex: 1 };
const leftAccessoryStyle: ViewStyle = { marginEnd: Spacing.xs, zIndex: 1 };

const containerPresets = {
  default: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
  filled: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
  text: {
    marginVertical: Spacing.md,
    borderRadius: Spacing.lg,
  },
  
};

const viewPresets = {
  default: [
    baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colorPalette.primaryBg.primaryOrange,
    },
  ] as StyleProp<ViewStyle>,
  filled: [baseViewStyle] as StyleProp<ViewStyle>,
  text: [{ marginHorizontal: Spacing.xs }] as StyleProp<ViewStyle>,
 };

const textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: [baseTextStyle, { color: colorPalette.primaryBg.primaryWhite, fontFamily: AppFont.bold }],
  filled: [baseTextStyle, { color: colorPalette.primaryBg.primaryWhite, fontFamily: AppFont.bold }],
  text: [
    baseTextStyle,
    {
      color: colorPalette.primaryBg.primaryBlack,
      fontSize: Fonts.size.sm,
    },
  ],
};
