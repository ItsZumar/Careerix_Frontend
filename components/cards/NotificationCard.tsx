import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { wp, hp } from "@/utils";
import { Spacing, colorPalette } from "@/styles";
import { AppText } from "../common/AppText";
import { AppButton } from "../common/AppButton";
import { type Notification } from "@/constants";
import { Fonts } from "@/styles";

export interface NotificationCardProps {
  notification: Notification;
  onPress?: () => void;
  onActionPress?: () => void;
}

export const NotificationCard = ({
  notification,
  onPress,
  onActionPress,
}: NotificationCardProps) => {
  const getIconName = (type: Notification["type"]): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case "application":
        return "document-text";
      case "job":
        return "briefcase";
      case "message":
        return "chatbubble";
      case "system":
        return "notifications";
      default:
        return "notifications";
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "application":
        return colorPalette.primaryBg.primaryOrange;
      case "job":
        return colorPalette.primaryBg.primaryOrange;
      case "message":
        return colorPalette.primaryBg.primaryOrange;
      case "system":
        return colorPalette.primaryBg.secondaryGrey;
      default:
        return colorPalette.primaryBg.secondaryGrey;
    }
  };

  const getActionButtonText = (type: Notification["type"]): string => {
    switch (type) {
      case "application":
        return "See Details";
      case "job":
        return "Check Now";
      case "message":
        return "Check Message";
      case "system":
        return "See Details";
      default:
        return "See Details";
    }
  };

  const handleActionPress = () => {
    if (onActionPress) {
      onActionPress();
    } else {
      // TODO: Implement navigation based on notification type
      console.log("Action pressed for notification:", notification.id, notification.type);
    }
  };

  // Extract date and time from notification.time
  const getDateAndTime = () => {
    const timeString = notification.time;
    // Check if time contains a comma (e.g., "Yesterday, 3:45 PM" or "12 July, 2:30 PM")
    if (timeString.includes(",")) {
      const parts = timeString.split(",");
      return {
        date: parts[0].trim(),
        time: parts[1].trim(),
      };
    }
    // If no date, return empty date and the full time string
    return {
      date: "24 Jan",
      time: timeString,
    };
  };

  const { date, time } = getDateAndTime();

  return (
    <TouchableOpacity
      style={[styles.notificationItem, !notification.isRead && styles.unreadNotification]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.notificationIconContainer}>
        <Ionicons
          name={getIconName(notification.type)}
          size={wp(5)}
          color={getIconColor(notification.type)}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.dateTimeRow}>
          {date ? (
            <AppText
              text={date}
              type="description"
              style={styles.notificationDate}
            />
          ) : null}
          <AppText
            text={time}
            type="description"
            style={styles.notificationTime}
          />
        </View>
        <AppText
          text={notification.title}
          type="subHeading"
          style={[styles.notificationTitle, !notification.isRead && styles.unreadTitle]}
        />
        <AppText
          text={notification.message}
          type="description"
          style={styles.notificationMessage}
        />
        <AppButton
            text={getActionButtonText(notification.type)}
            preset="outline"
            onPress={handleActionPress}
            // style={styles.actionButton}
            textStyle={styles.actionButtonText}
          />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.md,
    backgroundColor: colorPalette.primaryBg.tertiary,
    borderRadius: wp(2),
    gap: Spacing.md,
    position: "relative",
    marginBottom: Spacing.sm,
  },
  unreadNotification: {
    backgroundColor: colorPalette.primaryBg.tertiary,
  },
  notificationIconContainer: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: colorPalette.primaryBg.primaryWhite,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.xxs,
  },
  notificationContent: {
    flex: 1,
  },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.xxs,
  },
  notificationDate: {
    color: colorPalette.primaryBg.secondaryGrey,
    fontSize: wp(3),
  },
  notificationTime: {
    color: colorPalette.primaryBg.secondaryGrey,
    fontSize: wp(3),
  },
  notificationTitle: {
    marginBottom: Spacing.xxs,
  },
  unreadTitle: {
    fontWeight: "600",
  },
  notificationMessage: {
    marginBottom: Spacing.xs,
    color: colorPalette.primaryBg.secondaryGrey,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: Spacing.xxs,
  },
  actionButton: {
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    minHeight: hp(3.5),
    borderRadius: wp(2),
    marginLeft: Spacing.sm,
    marginVertical: 0,
  },
  actionButtonText: {
    fontSize: Fonts.size.sm,
  },
});
