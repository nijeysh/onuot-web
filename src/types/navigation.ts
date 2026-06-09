export const PAGE_TYPES = {
  DASHBOARD: 'dashboard',
  LOGIN: 'login',
  CALENDAR: 'calendar',
  CHAT: 'chat',
  OOTD: 'ootd',
  SETTINGS: 'settings',
} as const;

export type PageType = typeof PAGE_TYPES[keyof typeof PAGE_TYPES];

export const SETTINGS_TABS = {
  GENERAL: 'general',
  ACCOUNT: 'account',
  NOTIFICATIONS: 'notifications',
  PRIVACY: 'privacy',
} as const;

export type SettingsTab = typeof SETTINGS_TABS[keyof typeof SETTINGS_TABS];
