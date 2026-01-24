import React from "react";
import { View, StyleSheet } from "react-native";

import { ScreenWrapper, AppText } from "@/components";
import { LayoutStyles, colorPalette } from "@/styles";

const ChatsScreen = () => {
  return (
    <ScreenWrapper style={LayoutStyles.horizontalSpacing}>
      <View style={styles.container}>
        <AppText text="Chats" type="title" />
      </View>
    </ScreenWrapper>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.primaryBg.primaryWhite,
  },
});
