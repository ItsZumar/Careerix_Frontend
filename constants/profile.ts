export const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export const rolesOptions = [
  { label: "Student", value: "student" },
  { label: "Worker", value: "worker" },
  { label: "Professional", value: "professional" },
  { label: "Entrepreneur", value: "entrepreneur" },
  { label: "Freelancer", value: "freelancer" },
  { label: "Other", value: "other" },
];

export const JOB_CATEGORIES = [
  "Surveys & Research",
  "IT & Tech Services",
  "Marketing & Social Media",
  "Gig-Based Jobs",
  "Event Staff",
  "Creative & Design",
  "Delivery",
  "Tuition & Teaching",
  "Freelance Writing",
];

export const profileTextInputFields = [
  {
    name: "name" as const,
    placeholder: "Enter Name",
    leftIcon: "person-outline" as const,
  },
  {
    name: "phoneNumber" as const,
    placeholder: "Enter Phone Number",
    leftIcon: "call-outline" as const,
    keyboardType: "phone-pad" as const,
  },
];

export const profilePickerFields = [
  {
    name: "genderIdentity" as const,
    placeholder: "Gender",
    options: genderOptions,
  },
  {
    name: "roles" as const,
    placeholder: "Role",
    options: rolesOptions,
  },
];

export const workInterestFields = [
  {
    placeholder: "Preferred Job Type",
    leftIcon: "briefcase-outline" as const,
  },
  {
    placeholder: "Preferred Location",
    leftIcon: "location-outline" as const,
  },
  {
    placeholder: "Expected Salary Range",
    leftIcon: "cash-outline" as const,
    keyboardType: "numeric" as const,
  },
  {
    placeholder: "Availability (e.g., Full-time, Part-time)",
    leftIcon: "time-outline" as const,
  },
];

export const WORK_LOCATION_OPTIONS = [
  "Mostly Nearby",
  "Remote",
  "On-site",
  "Hybrid",
];
