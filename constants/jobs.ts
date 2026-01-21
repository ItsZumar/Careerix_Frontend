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

export interface PickerOption {
  label: string;
  value: string;
}

export const jobTypeFilterOptions: PickerOption[] = [
  { label: "All Types", value: "all-types" },
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
  { label: "Internship", value: "internship" },
];

export const datePostedFilterOptions: PickerOption[] = [
  { label: "Any Time", value: "any-time" },
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 3 days", value: "3d" },
  { label: "Last week", value: "1w" },
  { label: "Last 2 weeks", value: "2w" },
  { label: "Last month", value: "1m" },
];

export const salaryFilterOptions: PickerOption[] = [
  { label: "Any Salary", value: "any-salary" },
  { label: "$0 - $25,000", value: "0-25k" },
  { label: "$25,000 - $50,000", value: "25k-50k" },
  { label: "$50,000 - $75,000", value: "50k-75k" },
  { label: "$75,000 - $100,000", value: "75k-100k" },
  { label: "$100,000+", value: "100k+" },
];

export const locationFilterOptions: PickerOption[] = [
  { label: "All Locations", value: "all-locations" },
  { label: "Remote", value: "remote" },
  { label: "On-site", value: "onsite" },
  { label: "Hybrid", value: "hybrid" },
  { label: "New York", value: "new-york" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Chicago", value: "chicago" },
  { label: "Houston", value: "houston" },
];

export const FILTER_CONFIG = [
  { id: "jobType", placeholder: "Job Type", options: jobTypeFilterOptions },
  { id: "datePosted", placeholder: "Date Posted", options: datePostedFilterOptions },
  { id: "salary", placeholder: "Salary", options: salaryFilterOptions },
  { id: "location", placeholder: "Location", options: locationFilterOptions },
] as const;
