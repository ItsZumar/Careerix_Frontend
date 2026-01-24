import React from "react";
import {
  StyleSheet,
  TextInput as InputText,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { colorPalette, FormsStyle, iconSize, Spacing } from "@/styles";

interface SearchBarProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap | any;
  onRightIconPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  containerStyle,
  inputStyle,
  leftIcon = "search-outline",
  rightIcon,
  onRightIconPress,
  ...props
}) => {
  const renderRightIcon = () => {
    if (!rightIcon) return null;

    const isStringIcon = typeof rightIcon === "string";
    const iconContent = isStringIcon ? (
      <Ionicons name={rightIcon as keyof typeof Ionicons.glyphMap} size={iconSize} color={colorPalette.primaryBg.secondaryGrey} />
    ) : (
      <Image source={rightIcon} style={styles.rightIconImage} contentFit="contain" />
    );

    if (onRightIconPress) {
      return (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconWrapper}>
          {iconContent}
        </TouchableOpacity>
      );
    }

    return <View style={styles.rightIconWrapper}>{iconContent}</View>;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <View style={styles.leftIconWrapper}>
            <Ionicons name={leftIcon} size={iconSize}  />
          </View>
        )}
        <InputText
          style={[
            FormsStyle.formControl,
            styles.searchInput,
            leftIcon && styles.inputWithLeftIcon,
            rightIcon && styles.inputWithRightIcon,
            inputStyle,
          ]}
          placeholderTextColor={colorPalette.primaryBg.secondaryGrey}
          {...props}
        />
        {renderRightIcon()}
      </View>
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
  inputWithRightIcon: {
    paddingRight: Spacing.xl + Spacing.sm,
  },
  rightIconWrapper: {
    position: "absolute",
    right: Spacing.sm,
    zIndex: 1,
    padding: Spacing.xs,
  },
  rightIconImage: {
    width: iconSize,
    height: iconSize,
  },
  searchInput: {
    borderRadius: Spacing.lg,
  },
});

export default SearchBar;
