import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View>
      <Text>Welcom</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  signupLink: {
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  signupButtonText: {
    color: "#fff",
  },
});
