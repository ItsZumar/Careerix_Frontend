import React from "react";
import {
  StyleSheet,
  TextInput as InputText,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colorPalette, FormsStyle, iconSize, Spacing } from "@/styles";

interface SearchBarProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: keyof typeof Ionicons.glyphMap;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  containerStyle,
  inputStyle,
  leftIcon = "search-outline",
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <View style={styles.leftIconWrapper}>
            <Ionicons name={leftIcon} size={iconSize} color={colorPalette.primaryBg.secondaryGrey} />
          </View>
        )}
        <InputText
          style={[FormsStyle.formControl, styles.searchInput, leftIcon && styles.inputWithLeftIcon, inputStyle]}
          placeholderTextColor={colorPalette.primaryBg.darkGrey}
          {...props}
        />
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
  searchInput: {
    borderRadius: Spacing.lg,
  },
});

export default SearchBar;
