import { defaultSettings, readSettings, writeSettings } from "@/api/data-store";
import type { StoreSettings } from "@/types/admin";

export const getSettings = () => readSettings();

export const saveSettings = (settings: Omit<StoreSettings, "updatedAt">): StoreSettings => {
  const nextSettings: StoreSettings = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };
  writeSettings(nextSettings);
  return nextSettings;
};

export const getDefaultSettings = () => defaultSettings;
