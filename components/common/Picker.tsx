import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "./AppText";
import { colorPalette, FormsStyle, iconSize, Spacing, Typography } from "@/styles";
import { ErrorMessage } from "./ErrorMessage";
import { BottomModal } from "../modals/BottomModal";

interface PickerOption {
  label: string;
  value: string;
}

interface PickerI {
  label?: string;
  placeholder?: string;
  options: PickerOption[];
  value: string;
  onValueChange: (value: string) => void;
  onBlur?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string;
  visible?: boolean;
}

export const Picker: React.FC<PickerI> = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  onValueChange,
  onBlur,
  containerStyle,
  error,
  visible,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setIsOpen(false);
    if (onBlur) onBlur();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <AppText text={label} style={[FormsStyle.formLabel, Typography.label]} />}
      <TouchableOpacity
        style={[FormsStyle.formControl, styles.pickerButton]}
        onPress={() => setIsOpen(true)}
      >
        <View style={styles.textContainer}>
          <AppText
            text={selectedOption ? selectedOption.label : placeholder}
            type="default"
            style={[styles.pickerText, !selectedOption && styles.placeholderText]}
          />
        </View>
        <Ionicons name="chevron-down" size={iconSize} color={colorPalette.primaryBg.secondaryGrey} />
      </TouchableOpacity>

      {error && visible && <ErrorMessage error={error} visible={visible} />}

      <BottomModal visible={isOpen} onClose={() => setIsOpen(false)} title={placeholder || "Select an option"}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.optionItem, value === item.value && styles.selectedOption]}
              onPress={() => handleSelect(item.value)}
            >
              <AppText text={item.label} type="default" style={value === item.value && styles.selectedOptionText} />
              {value === item.value && <Ionicons name="checkmark" size={20} color={colorPalette.primaryBg.primaryOrange} />}
            </TouchableOpacity>
          )}
        />
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: Spacing.md,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    minHeight: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pickerText: {
    color: colorPalette.primaryBg.primaryBlack,
  },
  placeholderText: {
    color: colorPalette.primaryBg.darkGrey,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.primaryBg.tertiary,
  },
  selectedOption: {
    backgroundColor: colorPalette.primaryBg.tertiary,
  },
  selectedOptionText: {
    color: colorPalette.primaryBg.primaryOrange,
    fontWeight: "600",
  },
});
