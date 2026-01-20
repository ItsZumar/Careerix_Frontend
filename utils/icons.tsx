import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface IconProps {
  size?: number;
  color?: string;
}

export const createIconComponent = (iconName: keyof typeof Ionicons.glyphMap) => {
  return ({ size = 24, color = "#FFFFFF" }: IconProps) => (
    <Ionicons name={iconName} size={size} color={color} />
  );
};

export const BriefcaseIcon = createIconComponent("briefcase-outline");
export const FileTextIcon = createIconComponent("document-text-outline");
export const MonitorIcon = createIconComponent("desktop-outline");
export const UsersIcon = createIconComponent("people-outline");
export const DeliveryIcon = createIconComponent("car-outline");
