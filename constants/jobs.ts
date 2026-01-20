import {
  BriefcaseIcon,
  FileTextIcon,
  MonitorIcon,
  UsersIcon,
  DeliveryIcon,
} from "@/utils/icons";

export const suggestedJobs = [
  {
    id: "1",
    companyName: "Creliq-XPO",
    postedTime: "2h ago",
    jobTitle: "Delivery man for 2 days",
    location: "Dhaka",
    workType: "On-site",
    schedule: "4 AM - 2 PM",
    applicationsCount: 12,
    salaryRange: "200-250 P",
  },
  {
    id: "2",
    companyName: "Bolt Services",
    postedTime: "5h ago",
    jobTitle: "Weekend Delivery Rider",
    location: "Dhaka",
    workType: "On-site",
    schedule: "6 AM - 12 PM",
    applicationsCount: 8,
    salaryRange: "180-220 P",
  },
  {
    id: "3",
    companyName: "Urban Courier",
    postedTime: "1d ago",
    jobTitle: "Part-time Delivery Partner",
    location: "Dhaka",
    workType: "Hybrid",
    schedule: "Flexible",
    applicationsCount: 20,
    salaryRange: "150-200 P",
  },
];

export const categories = [
  { icon: BriefcaseIcon, label: "All" },
  { icon: FileTextIcon, label: "Surveys" },
  { icon: MonitorIcon, label: "IT Service" },
  { icon: UsersIcon, label: "Tuition" },
  { icon: DeliveryIcon, label: "Delivery" },
];
