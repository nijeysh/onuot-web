import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { PageType, SettingsTab } from '../types/navigation';
import { PAGE_TYPES, SETTINGS_TABS } from '../types/navigation';

const CURRENT_PAGE_STORAGE_KEY = 'weather-app-current-page';
const SETTINGS_TAB_STORAGE_KEY = 'weather-app-settings-tab';
const pageTypes = Object.values(PAGE_TYPES) as PageType[];
const settingsTabs = Object.values(SETTINGS_TABS) as SettingsTab[];

interface NavigationContextType {
  currentPage: PageType;
  activeSettingsTab: SettingsTab;
  navigateTo: (page: PageType) => void;
  navigateToSettings: (tab: SettingsTab) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const getStoredPage = (): PageType => {
  const storedPage = window.localStorage.getItem(CURRENT_PAGE_STORAGE_KEY);
  return pageTypes.includes(storedPage as PageType) ? storedPage as PageType : PAGE_TYPES.DASHBOARD;
};

const getStoredSettingsTab = (): SettingsTab => {
  const storedTab = window.localStorage.getItem(SETTINGS_TAB_STORAGE_KEY);
  return settingsTabs.includes(storedTab as SettingsTab) ? storedTab as SettingsTab : SETTINGS_TABS.GENERAL;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageType>(getStoredPage);
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>(getStoredSettingsTab);

  const navigateTo = (page: PageType) => {
    window.localStorage.setItem(CURRENT_PAGE_STORAGE_KEY, page);
    setCurrentPage(page);
  };

  const navigateToSettings = (tab: SettingsTab) => {
    window.localStorage.setItem(CURRENT_PAGE_STORAGE_KEY, PAGE_TYPES.SETTINGS);
    window.localStorage.setItem(SETTINGS_TAB_STORAGE_KEY, tab);
    setCurrentPage(PAGE_TYPES.SETTINGS);
    setActiveSettingsTab(tab);
  };

  return (
    <NavigationContext.Provider value={{ currentPage, activeSettingsTab, navigateTo, navigateToSettings }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
