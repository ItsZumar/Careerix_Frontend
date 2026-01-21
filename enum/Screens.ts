export enum Screens {
  // Root
  Root = "/",

  // Auth
  Signin = "/auth/signin",
  Signup = "/auth/signup",
  Verification = "/auth/verification",
  ForgotPassword = "/auth/forgot-password",
  CreateNewPassword = "/auth/create-new-password",

  // Profile setup
  ProfileSetup = "/profile-setup",
  ProfileSetupComplete = "/profile-setup-complete",

  // Tabs root
  TabsRoot = "/(tabs)",

  // Individual tabs
  TabsHome = "/(tabs)/",
  TabsDashboard = "/(tabs)/dashboard",
  TabsChats = "/(tabs)/chats",
  TabsProfile = "/(tabs)/profile",

  // Other
  Notifications = "/notifications",
  JobSearch = "/job-search",
  JobDetail = "/job/job-detail",
}
