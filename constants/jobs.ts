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

export const vehicleOptions: PickerOption[] = [
  { label: "Motorcycle", value: "motorcycle" },
  { label: "Bicycle", value: "bicycle" },
  { label: "Car", value: "car" },
  { label: "Van", value: "van" },
  { label: "Truck", value: "truck" },
];

export const shiftOptions: PickerOption[] = [
  { label: "Morning", value: "morning" },
  { label: "Afternoon", value: "afternoon" },
  { label: "Evening", value: "evening" },
  { label: "Night", value: "night" },
  { label: "Flexible", value: "flexible" },
];

export const defaultJobRequirements = [
  "Bachelor's degree in Business Administration or related field",
  "Minimum 5 years of experience in operations management",
  "Strong leadership and team management skills",
  "Excellent problem-solving and analytical abilities",
  "Proficiency in project management tools",
  "Effective communication and interpersonal skills",
];

export const defaultAboutJobDescription =
  "We are seeking an experienced Operations Manager to lead and streamline daily operations, ensuring efficiency and excellence. In this role, you'll manage teams, optimize workflows, and implement strategies to meet organizational goals.";

export const defaultJobDetailData = {
  peopleCount: "02 People",
  startDate: "12 July",
  endDate: "15 July",
  recruiterName: "John Doe",
  recruiterRating: "4.5",
  recruiterJobsPosted: "20 Jobs Posted",
};

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: "application" | "job" | "message" | "system";
}

export interface NotificationSection {
  title: string;
  data: Notification[];
}

export const notificationSections: NotificationSection[] = [
  {
    title: "Today",
    data: [
      {
        id: "1",
        title: "Application Status Update",
        message: "Your application for Delivery man position has been reviewed",
        time: "2h ago",
        isRead: false,
        type: "application",
      },
      {
        id: "2",
        title: "New Job Match",
        message: "We found a new job that matches your profile: Weekend Delivery Rider",
        time: "4h ago",
        isRead: false,
        type: "job",
      },
      {
        id: "3",
        title: "Message Received",
        message: "You have a new message from Creliq-XPO recruiter",
        time: "5h ago",
        isRead: true,
        type: "message",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: "4",
        title: "Application Submitted",
        message: "Your application for Part-time Delivery Partner has been submitted successfully",
        time: "Yesterday, 3:45 PM",
        isRead: true,
        type: "application",
      },
      {
        id: "5",
        title: "Profile Update",
        message: "Your profile has been updated successfully",
        time: "Yesterday, 2:30 PM",
        isRead: true,
        type: "system",
      },
    ],
  },
  {
    title: "This Week",
    data: [
      {
        id: "6",
        title: "Job Recommendation",
        message: "Based on your profile, we recommend checking out this new delivery position",
        time: "3 days ago",
        isRead: true,
        type: "job",
      },
      {
        id: "7",
        title: "Application Reminder",
        message: "Don't forget to complete your application for Weekend Delivery Rider",
        time: "5 days ago",
        isRead: true,
        type: "application",
      },
    ],
  },
];
