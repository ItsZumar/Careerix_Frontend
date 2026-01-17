import React, { useState } from "react";
import {
  StyleSheet,
  TextInput as InputText,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableWithoutFeedback,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { colorPalette, FormsStyle, iconSize, Spacing, Typography } from "@/styles";
import { ErrorMessage } from "./ErrorMessage";

interface TextInputI extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  icon?: string;
  onIconPress?: () => void;
  leftIcon?: string;
  secureInput?: boolean;
  error?: string;
  visible?: boolean;
}

export const TextInput: React.FC<TextInputI> = ({
  label,
  containerStyle,
  inputStyle,
  error,
  icon,
  onIconPress,
  leftIcon,
  secureInput = false,
  visible,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(!secureInput);

  const handleIconPress = () => {
    setPasswordVisible((prev) => !prev);
    if (onIconPress) onIconPress();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText text={label} style={[FormsStyle.formLabel, Typography.label]} />}
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <View style={styles.leftIconWrapper}>
            <Ionicons name={leftIcon as any} size={iconSize} color={colorPalette.primaryBg.secondaryGrey} />
          </View>
        )}
        <InputText
          style={[FormsStyle.formControl, leftIcon && styles.inputWithLeftIcon, inputStyle]}
          placeholderTextColor={colorPalette.primaryBg.darkGrey}
          secureTextEntry={secureInput && !isPasswordVisible}
          {...props}
        />
        {secureInput && (
          <TouchableWithoutFeedback onPress={handleIconPress}>
            <View style={styles.iconWrapper}>
              <Entypo name={isPasswordVisible ? "eye" : "eye-with-line"} size={iconSize} color={colorPalette.primaryBg.secondaryGrey} />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {error && visible && <ErrorMessage error={error} visible={visible} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  leftIconWrapper: {
    position: "absolute",
    left: Spacing.sm,
    zIndex: 1,
    padding: Spacing.xs,
  },
  inputWithLeftIcon: {
    paddingLeft: Spacing.xl + Spacing.sm,
  },
  iconWrapper: {
    position: "absolute",
    right: Spacing.sm,
    padding: Spacing.xs,
  },
});

export default TextInput;
