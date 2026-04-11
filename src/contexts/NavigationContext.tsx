import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { PageType, SettingsTab } from '../types/navigation';
import { PAGE_TYPES, SETTINGS_TABS } from '../types/navigation';

interface NavigationContextType {
  currentPage: PageType;
  activeSettingsTab: SettingsTab;
  navigateTo: (page: PageType) => void;
  navigateToSettings: (tab: SettingsTab) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<PageType>(PAGE_TYPES.DASHBOARD);
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTab>(SETTINGS_TABS.GENERAL);

  const navigateTo = (page: PageType) => {
    setCurrentPage(page);
  };

  const navigateToSettings = (tab: SettingsTab) => {
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
