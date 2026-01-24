import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { AppText } from "./AppText";
import { colorPalette, Spacing } from "@/styles";

interface SectionHeaderProps {
  title: string;
  onPressSeeAll?: () => void;
  showSeeAll?: boolean;
}

export const SectionHeader = ({
  title,
  onPressSeeAll,
  showSeeAll = true,
}: SectionHeaderProps) => {
  const shouldShowSeeAll = showSeeAll && !!onPressSeeAll;

  return (
    <View style={styles.container}>
      <AppText text={title} type="subHeading" />

      {shouldShowSeeAll && (
        <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.7}>
          <AppText
            text="See all"
            type="description"
            style={styles.seeAllText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAllText: {
    color: colorPalette.primaryBg.primaryOrange,
  },
});

