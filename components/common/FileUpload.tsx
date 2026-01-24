import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { AppText } from "./AppText";
import { Spacing, colorPalette } from "@/styles";
import { wp } from "@/utils";

interface FileUploadProps {
  fileName: string | null;
  onUpload: () => void;
  onRemove: () => void;
  placeholder?: string;
}

export const FileUpload = ({
  fileName,
  onUpload,
  onRemove,
  placeholder = "Choose File",
}: FileUploadProps) => {
  if (fileName) {
    return (
      <View style={styles.fileContainer}>
        <View style={styles.fileInfo}>
          <Ionicons
            name="document-text"
            size={wp(5)}
            color={colorPalette.primaryBg.primaryOrange}
          />
          <AppText text={fileName} type="description" style={styles.fileName} />
        </View>
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Ionicons
            name="close-circle"
            size={wp(5)}
            color={colorPalette.primaryBg.secondaryGrey}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.uploadButton}
      onPress={onUpload}
      activeOpacity={0.7}
    >
      <Ionicons
        name="cloud-upload-outline"
        size={wp(6)}
        color={colorPalette.primaryBg.primaryOrange}
      />
      <AppText text={placeholder} type="description" style={styles.uploadButtonText} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    marginTop: Spacing.xs,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: colorPalette.primaryBg.primaryOrange,
    borderStyle: "dashed",
    borderRadius: wp(2),
    backgroundColor: colorPalette.primaryBg.tertiary,
  },
  uploadButtonText: {
    color: colorPalette.primaryBg.primaryOrange,
  },
  fileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.xs,
    padding: Spacing.md,
    backgroundColor: colorPalette.primaryBg.tertiary,
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: colorPalette.primaryBg.primaryGrey,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    flex: 1,
  },
  fileName: {
    flex: 1,
    color: colorPalette.primaryBg.primaryBlack,
  },
  removeButton: {
    padding: Spacing.xs,
  },
});
